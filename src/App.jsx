import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MousePointer2, ZoomIn } from 'lucide-react'
import TopBar from './components/TopBar.jsx'
import ToolRail from './components/ToolRail.jsx'
import NodeCard from './components/NodeCard.jsx'
import EdgeLayer from './components/EdgeLayer.jsx'
import Inspector from './components/Inspector.jsx'
import ZoomDock from './components/ZoomDock.jsx'
import Minimap from './components/Minimap.jsx'
import EdgeQuickBar from './components/EdgeQuickBar.jsx'
import TemplatesModal from './components/TemplatesModal.jsx'
import HelpModal from './components/HelpModal.jsx'
import PreviewModal from './components/PreviewModal.jsx'
import Toast from './components/Toast.jsx'
import {
  createBlankDoc, createDocFromTemplate, EDGE_COLORS, ESTIMATED_HEIGHT,
  NODE_TYPES, TEMPLATES, nodeHeight, uid,
} from './data/flowData.js'
import { clamp, getBezier, getFlowBounds, pointInNode } from './lib/geometry.js'
import { useFlowHistory } from './lib/useFlowHistory.js'
import { downloadJSON, loadDoc, loadView, saveDoc, saveView } from './lib/storage.js'
import { putMedia } from './lib/mediaStore.js'

const DEFAULT_VIEW = () => {
  const width = window.innerWidth
  if (width >= 1500) return { x: 10, y: 140, zoom: 0.78 }
  if (width >= 1200) return { x: 10, y: 136, zoom: 0.72 }
  if (width >= 900) return { x: 8, y: 150, zoom: 0.6 }
  return { x: 8, y: 170, zoom: 0.5 }
}

const isTextInput = (target) => {
  if (!target) return false
  const tag = target.tagName?.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable
}

const slug = (value) => String(value || 'fluxo')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'fluxo'

function freeSpot(x, y, allNodes, nodeIdToIgnore = null) {
  let px = Math.round(x)
  let py = Math.round(y)
  const collides = (tx, ty) => allNodes.some((n) => {
    if (n.id === nodeIdToIgnore) return false
    const nh = nodeHeight(n)
    return tx < n.x + n.w + 18 && tx + 304 + 18 > n.x && ty < n.y + nh + 18 && ty + ESTIMATED_HEIGHT.text + 18 > n.y
  })
  for (let i = 0; i < 24; i += 1) {
    if (!collides(px, py)) return { x: px, y: py }
    py += 92
  }
  return { x: px + 360, y }
}

function newEdgeColor(source, outCount) {
  if (source?.type === 'condition') return outCount === 0 ? '#a3e635' : '#fb7185'
  return EDGE_COLORS[outCount % EDGE_COLORS.length].value
}

function edgeLabelFor(source, outCount) {
  if (source?.type === 'condition') return outCount === 0 ? 'Sim' : 'Não'
  return ''
}

export default function App() {
  const initialDoc = useMemo(() => loadDoc() || createDocFromTemplate(TEMPLATES[0]), [])
  const initialView = useMemo(() => loadView() || DEFAULT_VIEW(), [])
  const { doc, docRef, apply, pushSnapshot, undo, redo, canUndo, canRedo } = useFlowHistory(initialDoc)

  const [view, setViewState] = useState(initialView)
  const viewRef = useRef(initialView)
  const [sizes, setSizes] = useState({})
  const sizesRef = useRef({})
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [selected, setSelected] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [connecting, setConnecting] = useState(null)
  const [panning, setPanning] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [spaceHeld, setSpaceHeld] = useState(false)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [saveState, setSaveState] = useState('saved')
  const [fitting, setFitting] = useState(false)

  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const importInputRef = useRef(null)
  const pickerRef = useRef(null)
  const connectCleanupRef = useRef(null)
  const pinchRef = useRef(null)
  const toastTimerRef = useRef(null)
  const mountedRef = useRef(true)

  const selectedNode = selected?.type === 'node' ? doc.nodes.find((n) => n.id === selected.id) : null
  const selectedEdge = selected?.type === 'edge' ? doc.edges.find((e) => e.id === selected.id) : null
  const selectedOutEdges = useMemo(
    () => (selectedNode ? doc.edges.filter((e) => e.from === selectedNode.id) : []),
    [doc.edges, selectedNode],
  )
  const edgeSource = selectedEdge ? doc.nodes.find((n) => n.id === selectedEdge.from) : null
  const edgeTarget = selectedEdge ? doc.nodes.find((n) => n.id === selectedEdge.to) : null

  useEffect(() => { viewRef.current = view }, [view])
  useEffect(() => { sizesRef.current = sizes }, [sizes])
  useEffect(() => {
    setCanvasSize({ width: canvasRef.current?.clientWidth || window.innerWidth, height: canvasRef.current?.clientHeight || window.innerHeight })
  }, [])

  useEffect(() => {
    document.title = `${doc.title?.trim() || 'Fluxo sem título'} · flui`
  }, [doc.title])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => {
      setCanvasSize({ width: el.clientWidth, height: el.clientHeight })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => () => { mountedRef.current = false }, [])

  const commitView = useCallback((next) => {
    viewRef.current = next
    setViewState(next)
  }, [])

  const screenToWorld = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    const v = viewRef.current
    return {
      x: (clientX - rect.left - v.x) / v.zoom,
      y: (clientY - rect.top - v.y) / v.zoom,
    }
  }, [])

  const zoomAt = useCallback((clientX, clientY, factor) => {
    const rect = canvasRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    const prev = viewRef.current
    const nextZoom = clamp(prev.zoom * factor, 0.18, 2.3)
    if (Math.abs(nextZoom - prev.zoom) < 0.0001) return
    const wx = (clientX - rect.left - prev.x) / prev.zoom
    const wy = (clientY - rect.top - prev.y) / prev.zoom
    commitView({
      x: clientX - rect.left - wx * nextZoom,
      y: clientY - rect.top - wy * nextZoom,
      zoom: nextZoom,
    })
  }, [commitView])

  const zoomCenter = useCallback((factor) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor)
  }, [zoomAt])

  const setZoom100 = useCallback(() => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const v = viewRef.current
    const wx = (rect.width / 2 - v.x) / v.zoom
    const wy = (rect.height / 2 - v.y) / v.zoom
    commitView({ x: rect.width / 2 - wx, y: rect.height / 2 - wy, zoom: 1 })
  }, [commitView])

  const fitView = useCallback(() => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const panelOpen = Boolean(selected && window.innerWidth > 900)
    const bounds = getFlowBounds(doc.nodes, sizes, 60)
    const left = 42
    const right = rect.width - (panelOpen ? 388 : 42)
    const top = 100
    const bottom = rect.height - 90
    const z = clamp(Math.min((right - left) / bounds.width, (bottom - top) / bounds.height), 0.22, 1.2)
    const x = left + (right - left - bounds.width * z) / 2 - bounds.minX * z
    const y = top + (bottom - top - bounds.height * z) / 2 - bounds.minY * z
    commitView({ x, y, zoom: z })
  }, [doc.nodes, sizes, selected, commitView])

  useEffect(() => {
    if (!fitting) return undefined
    const timer = setTimeout(() => {
      fitView()
      setFitting(false)
    }, 180)
    return () => clearTimeout(timer)
  }, [fitting, fitView])

  const notify = useCallback((message, options = {}) => {
    clearTimeout(toastTimerRef.current)
    const id = Date.now() + Math.random()
    const next = {
      id,
      message,
      tone: options.tone || 'success',
      actionLabel: options.actionLabel,
      onAction: options.onAction ? () => { options.onAction(); setToast(null) } : undefined,
    }
    setToast(next)
    toastTimerRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
    }, options.duration || 3800)
  }, [])

  useEffect(() => () => clearTimeout(toastTimerRef.current), [])

  useEffect(() => {
    setSaveState('saving')
    const timer = setTimeout(() => {
      const ok = saveDoc(doc)
      setSaveState(ok ? 'saved' : 'error')
    }, 380)
    return () => clearTimeout(timer)
  }, [doc])

  useEffect(() => {
    const timer = setTimeout(() => saveView(view), 260)
    return () => clearTimeout(timer)
  }, [view])

  useEffect(() => {
    const onBeforeUnload = () => {
      saveDoc(docRef.current)
      saveView(viewRef.current)
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') onBeforeUnload()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [docRef])

  const handleMeasure = useCallback((id, w, h) => {
    setSizes((prev) => {
      if (prev[id]?.w === w && prev[id]?.h === h) return prev
      return { ...prev, [id]: { w, h } }
    })
  }, [])

  const ensureVisible = useCallback((node) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const v = viewRef.current
    const rightLimit = rect.width - (window.innerWidth > 900 ? 396 : 28)
    const leftLimit = window.innerWidth > 900 ? 116 : 28
    const left = v.x + node.x * v.zoom
    const right = v.x + (node.x + (node.w || 304)) * v.zoom
    const top = v.y + node.y * v.zoom
    const bottom = v.y + (node.y + (nodeHeight(node) || 180)) * v.zoom
    let dx = 0
    let dy = 0
    if (right > rightLimit - 24) dx = rightLimit - 24 - right
    if (left < leftLimit) dx = leftLimit - left
    if (bottom > rect.height - 100) dy = rect.height - 100 - bottom
    if (top < 96) dy = 96 - top
    if (dx || dy) commitView({ ...v, x: v.x + dx, y: v.y + dy })
  }, [commitView])

  const connectNodes = useCallback((fromId, toId, options = {}) => {
    let createdEdgeId = null
    let existed = false
    apply((prev) => {
      const from = prev.nodes.find((n) => n.id === fromId)
      const to = prev.nodes.find((n) => n.id === toId)
      if (!from || !to || fromId === toId || to.type === 'start') return prev
      const existing = prev.edges.find((e) => e.from === fromId && e.to === toId)
      if (existing) {
        existed = true
        createdEdgeId = existing.id
        return prev
      }
      const outCount = prev.edges.filter((e) => e.from === fromId).length
      createdEdgeId = uid('e')
      const entry = {
        id: createdEdgeId,
        from: fromId,
        to: toId,
        color: options.color || newEdgeColor(from, outCount),
        label: options.label !== undefined ? options.label : edgeLabelFor(from, outCount),
        animated: true,
        dashed: false,
      }
      return { ...prev, edges: [...prev.edges, entry] }
    })
    if (createdEdgeId) {
      setSelected({ type: 'edge', id: createdEdgeId })
      setEditingId(null)
      if (existed) notify('Esses balões já estão ligados. Edite a ligação existente.')
    }
    return createdEdgeId
  }, [apply, notify])

  const addNode = useCallback((type, options = {}) => {
    const current = docRef.current
    let source = null
    if (selected?.type === 'node') source = current.nodes.find((n) => n.id === selected.id)
    else if (selected?.type === 'edge') {
      const edge = current.edges.find((e) => e.id === selected.id)
      source = edge ? current.nodes.find((n) => n.id === edge.to) : null
    }
    const width = type === 'start' ? 156 : 304
    let x
    let y
    if (source) {
      const sourceSize = sizesRef.current[source.id]
      const outCount = current.edges.filter((e) => e.from === source.id).length
      x = source.x + (sourceSize?.w || source.w) + 96 + (options.offsetX || 0)
      y = source.y + ((sourceSize?.h || nodeHeight(source)) - (ESTIMATED_HEIGHT[type] || 200)) / 2 + Math.min(outCount, 3) * 28
      const spot = freeSpot(x, y, current.nodes)
      x = spot.x
      y = spot.y
    } else {
      const rect = canvasRef.current?.getBoundingClientRect()
      const center = screenToWorld(rect.left + rect.width * 0.44, rect.top + rect.height * 0.52)
      const spot = freeSpot(center.x - width / 2, center.y - (ESTIMATED_HEIGHT[type] || 200) / 2, current.nodes)
      x = spot.x
      y = spot.y
    }

    const newNode = {
      id: uid(type),
      type,
      x: Math.round(x),
      y: Math.round(y),
      w: width,
      accent: NODE_TYPES[type].accent,
      title: '',
      text: '',
      ...(type === 'delay' ? { delay: { value: 2, unit: 'horas' } } : {}),
    }
    const color = source ? newEdgeColor(source, current.edges.filter((e) => e.from === source.id).length) : null
    const label = source ? edgeLabelFor(source, current.edges.filter((e) => e.from === source.id).length) : ''
    const newEdge = source ? {
      id: uid('e'), from: source.id, to: newNode.id, color, label, animated: true, dashed: false,
    } : null

    apply((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      edges: newEdge ? [...prev.edges, newEdge] : prev.edges,
    }))
    setSelected({ type: 'node', id: newNode.id })
    if (type === 'text') setEditingId(newNode.id)
    else setEditingId(null)
    requestAnimationFrame(() => ensureVisible(newNode))
    if (source) {
      // Keep the new connection visible, but let the new node own the panel.
      setSelected({ type: 'node', id: newNode.id })
    }
  }, [selected, apply, docRef, screenToWorld, ensureVisible])

  const createNodeAtDrop = useCallback((worldX, worldY, fromId) => {
    const currentNode = docRef.current
    const from = currentNode.nodes.find((n) => n.id === fromId)
    if (!from) return
    const height = ESTIMATED_HEIGHT.text
    const newNode = {
      id: uid('text'),
      type: 'text',
      x: Math.round(worldX),
      y: Math.round(worldY - height / 2),
      w: 304,
      accent: NODE_TYPES.text.accent,
      title: '',
      text: '',
    }
    const outCount = currentNode.edges.filter((e) => e.from === fromId).length
    const newEdge = {
      id: uid('e'),
      from: fromId,
      to: newNode.id,
      color: newEdgeColor(from, outCount),
      label: edgeLabelFor(from, outCount),
      animated: true,
      dashed: false,
    }
    apply((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      edges: [...prev.edges, newEdge],
    }))
    setSelected({ type: 'node', id: newNode.id })
    setEditingId(newNode.id)
  }, [apply, docRef])

  const removeSelection = useCallback(() => {
    if (!selected) return
    if (selected.type === 'node') {
      const node = docRef.current.nodes.find((n) => n.id === selected.id)
      if (!node) return
      if (node.type === 'start') {
        notify('O início é o coração do fluxo — ele não pode sair.', { tone: 'info' })
        return
      }
      apply((prev) => ({
        ...prev,
        nodes: prev.nodes.filter((n) => n.id !== node.id),
        edges: prev.edges.filter((e) => e.from !== node.id && e.to !== node.id),
      }))
      setSelected(null)
      setEditingId(null)
      notify('Balão excluído.', { actionLabel: 'Desfazer', onAction: undo })
    } else if (selected.type === 'edge') {
      apply((prev) => ({ ...prev, edges: prev.edges.filter((e) => e.id !== selected.id) }))
      setSelected(null)
      notify('Ligação removida.', { actionLabel: 'Desfazer', onAction: undo })
    }
  }, [selected, apply, docRef, notify, undo])

  const duplicateSelection = useCallback(() => {
    if (!selectedNode) return
    const clone = {
      ...selectedNode,
      id: uid(selectedNode.type),
      x: selectedNode.x + 38,
      y: selectedNode.y + 46,
      title: selectedNode.title ? `${selectedNode.title} · cópia` : '',
    }
    apply((prev) => ({ ...prev, nodes: [...prev.nodes, clone] }))
    setSelected({ type: 'node', id: clone.id })
    setEditingId(null)
    requestAnimationFrame(() => ensureVisible(clone))
    notify('Balão duplicado.')
  }, [selectedNode, apply, notify, ensureVisible])

  const patchSelectedNode = useCallback((patch, key) => {
    if (!selectedNode) return
    apply((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === selectedNode.id ? { ...n, ...patch } : n)),
    }), { key })
  }, [selectedNode, apply])

  const patchSelectedEdge = useCallback((patch, key) => {
    if (!selectedEdge) return
    apply((prev) => ({
      ...prev,
      edges: prev.edges.map((e) => (e.id === selectedEdge.id ? { ...e, ...patch } : e)),
    }), { key })
  }, [selectedEdge, apply])

  const changeSelectedEdgeColor = useCallback((color) => {
    if (!selectedEdge) return
    patchSelectedEdge({ color })
  }, [selectedEdge, patchSelectedEdge])

  const beginPan = useCallback((e) => {
    if (e.button !== 0 && e.button !== 1) return
    if (e.button === 1) e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startView = viewRef.current
    setPanning(true)
    document.body.classList.add('is-panning')
    const move = (ev) => {
      if (document.body.classList.contains('is-pinching')) return
      commitView({ ...startView, x: startView.x + (ev.clientX - startX), y: startView.y + (ev.clientY - startY) })
    }
    const end = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      setPanning(false)
      document.body.classList.remove('is-panning')
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
  }, [commitView])

  const handleCanvasPointerDown = useCallback((e) => {
    if (modal) return
    if (e.target.closest('.edge-label, .edge-hit, .node, .zoom-dock, .minimap, .toolrail, .edge-quickbar')) return
    if (e.button !== 0 && e.button !== 1) return
    if (spaceHeld || e.button === 1) {
      beginPan(e)
      return
    }
    setSelected(null)
    setEditingId(null)
    beginPan(e)
  }, [modal, spaceHeld, beginPan])

  const handleCanvasDoubleClick = useCallback((e) => {
    if (modal) return
    if (e.target.closest('.node, .edge-label, .minimap, .toolrail, .edge-quickbar, .zoom-dock')) return
    const point = screenToWorld(e.clientX, e.clientY)
    const height = ESTIMATED_HEIGHT.text
    const newNode = {
      id: uid('text'),
      type: 'text',
      x: Math.round(point.x - 152),
      y: Math.round(point.y - height / 2),
      w: 304,
      accent: NODE_TYPES.text.accent,
      title: '',
      text: '',
    }
    apply((prev) => ({ ...prev, nodes: [...prev.nodes, newNode] }))
    setSelected({ type: 'node', id: newNode.id })
    setEditingId(newNode.id)
  }, [modal, screenToWorld, apply])

  const handleNodePointerDown = useCallback((e, node) => {
    if (e.target.closest('[data-no-drag]')) return
    if (spaceHeld || e.button === 1) {
      e.stopPropagation()
      beginPan(e)
      return
    }
    if (e.button !== 0) return
    e.stopPropagation()
    setSelected({ type: 'node', id: node.id })
    if (editingId && editingId !== node.id) setEditingId(null)
    if (editingId === node.id && e.target.closest('textarea')) return

    const startX = e.clientX
    const startY = e.clientY
    const originX = node.x
    const originY = node.y
    let moved = false
    let snapshotted = false
    const move = (ev) => {
      if (document.body.classList.contains('is-pinching')) return
      const zoom = viewRef.current.zoom
      const dx = (ev.clientX - startX) / zoom
      const dy = (ev.clientY - startY) / zoom
      if (!moved && Math.hypot(dx, dy) < 3) return
      if (!moved) {
        moved = true
        setEditingId(null)
        setDraggingId(node.id)
        if (!snapshotted) {
          pushSnapshot()
          snapshotted = true
        }
      }
      const nextX = Math.round(originX + dx)
      const nextY = Math.round(originY + dy)
      apply((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === node.id ? { ...n, x: nextX, y: nextY } : n)),
      }), { history: false })
    }
    const end = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      setDraggingId(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
  }, [spaceHeld, editingId, beginPan, pushSnapshot, apply])

  const startConnect = useCallback((e, node) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    if (modal) return
    setSelected({ type: 'node', id: node.id })
    setEditingId(null)
    const nodeSize = sizesRef.current[node.id]
    const sourceBox = {
      x: node.x,
      y: node.y,
      w: nodeSize?.w || node.w,
      h: nodeSize?.h || nodeHeight(node),
    }
    const state = {
      from: node.id,
      x: sourceBox.x + sourceBox.w,
      y: sourceBox.y + sourceBox.h / 2,
      targetId: null,
      moved: false,
      cursorX: sourceBox.x + sourceBox.w,
      cursorY: sourceBox.y + sourceBox.h / 2,
    }
    setConnecting({ ...state })

    const move = (ev) => {
      const p = screenToWorld(ev.clientX, ev.clientY)
      const nodes = docRef.current.nodes
      const hit = [...nodes].reverse().find((n) => {
        if (n.id === node.id || n.type === 'start') return false
        const s = sizesRef.current[n.id]
        return pointInNode({ x: n.x, y: n.y, w: s?.w || n.w, h: s?.h || nodeHeight(n) }, p.x, p.y)
      })
      state.moved = state.moved || Math.hypot(p.x - (sourceBox.x + sourceBox.w), p.y - (sourceBox.y + sourceBox.h / 2)) > 14
      state.cursorX = p.x
      state.cursorY = p.y
      state.targetId = hit?.id || null
      if (hit) {
        const s = sizesRef.current[hit.id]
        state.x = hit.x
        state.y = hit.y + (s?.h || nodeHeight(hit)) / 2
      } else {
        state.x = p.x
        state.y = p.y
      }
      setConnecting({ ...state })
    }

    const cleanup = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      connectCleanupRef.current = null
      setConnecting(null)
    }
    const up = () => {
      const snapshot = { ...state }
      cleanup()
      if (snapshot.targetId) {
        connectNodes(node.id, snapshot.targetId)
      } else if (snapshot.moved) {
        createNodeAtDrop(snapshot.cursorX, snapshot.cursorY, node.id)
      }
    }
    const cancel = () => cleanup()
    connectCleanupRef.current = cancel
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
  }, [modal, screenToWorld, docRef, connectNodes, createNodeAtDrop])

  const cancelConnecting = useCallback(() => {
    connectCleanupRef.current?.()
  }, [])

  const pickMedia = useCallback((node) => {
    if (!node) return
    const kind = node.type
    if (!['audio', 'image', 'video'].includes(kind)) return
    pickerRef.current = { nodeId: node.id, kind }
    const input = fileInputRef.current
    if (!input) return
    input.accept = kind === 'audio' ? 'audio/*' : kind === 'video' ? 'video/*' : 'image/*'
    input.value = ''
    input.click()
  }, [])

  const uploadFileToNode = useCallback(async (file, nodeOrId, kindOverride) => {
    if (!file) return
    const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.id
    const node = docRef.current.nodes.find((n) => n.id === nodeId)
    if (!node) return
    const kind = kindOverride || node.type
    if (node.type === 'start') return
    if (file.size > 80 * 1024 * 1024) {
      notify('Esse arquivo passa de 80 MB. Escolha um menor para o fluxo continuar leve.', { tone: 'error' })
      return
    }
    const expected = kind === 'image' ? 'image/' : kind === 'video' ? 'video/' : 'audio/'
    if (file.type && !file.type.startsWith(expected)) {
      notify(`Esse arquivo não parece ser ${kind === 'image' ? 'uma imagem' : kind === 'video' ? 'um vídeo' : 'um áudio'}.`, { tone: 'error' })
      return
    }
    notify('Preparando a mídia…', { tone: 'info', duration: 1800 })
    try {
      const { id } = await putMedia(file, { name: file.name, type: file.type, size: file.size })
      apply((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === nodeId
          ? { ...n, mediaId: id, media: { name: file.name, type: file.type, size: file.size } }
          : n)),
      }))
      notify('Mídia adicionada ao balão.')
    } catch {
      notify('Não consegui guardar essa mídia. Tente um arquivo menor.', { tone: 'error' })
    }
  }, [apply, docRef, notify])

  const handleRecorded = useCallback(async (blob, node) => {
    if (!blob || !node) return
    const ext = blob.type.includes('mp4') ? 'm4a' : 'webm'
    const file = new File([blob], `gravacao-${Date.now()}.${ext}`, { type: blob.type || 'audio/webm' })
    notify('Salvando sua gravação…', { tone: 'info', duration: 1600 })
    try {
      const { id } = await putMedia(file, { name: file.name, type: file.type, size: file.size })
      apply((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === node.id
          ? { ...n, mediaId: id, media: { name: file.name, type: file.type, size: file.size } }
          : n)),
      }))
      notify('Áudio gravado e adicionado.')
    } catch {
      notify('Não consegui salvar a gravação.', { tone: 'error' })
    }
  }, [apply, notify])

  const removeMedia = useCallback((node) => {
    if (!node) return
    apply((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === node.id ? { ...n, mediaId: null, media: null } : n)),
    }))
    notify('Mídia removida.', { actionLabel: 'Desfazer', onAction: undo })
  }, [apply, notify, undo])

  const handleFilePicked = useCallback((e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    const picker = pickerRef.current
    pickerRef.current = null
    if (!file || !picker) return
    uploadFileToNode(file, picker.nodeId, picker.kind)
  }, [uploadFileToNode])

  const handleImportFile = useCallback((e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!parsed || !Array.isArray(parsed.nodes) || !parsed.nodes.length) throw new Error('sem nós')
        const allowed = new Set(['text', 'audio', 'image', 'video', 'condition', 'delay', 'start'])
        const nodes = parsed.nodes
          .filter((n) => n && typeof n.id === 'string' && allowed.has(n.type) && Number.isFinite(n.x) && Number.isFinite(n.y))
          .map((n) => ({
            ...n,
            w: n.type === 'start' ? 156 : (Number(n.w) || 304),
            accent: n.accent || NODE_TYPES[n.type].accent,
            title: String(n.title || ''),
            text: String(n.text || ''),
          }))
        if (!nodes.length) throw new Error('nenhum nó válido')
        const ids = new Set(nodes.map((n) => n.id))
        const edges = (Array.isArray(parsed.edges) ? parsed.edges : [])
          .filter((edge) => edge && ids.has(edge.from) && ids.has(edge.to))
          .map((edge) => ({
            ...edge,
            id: edge.id || uid('e'),
            color: edge.color || '#8b5cf6',
            label: String(edge.label || ''),
            animated: edge.animated !== false,
            dashed: Boolean(edge.dashed),
          }))
        const imported = {
          version: 1,
          templateId: parsed.templateId || 'imported',
          title: String(parsed.title || file.name.replace(/\.json$/i, '') || 'Fluxo importado'),
          nodes,
          edges,
        }
        apply(() => imported)
        setSelected(null)
        setEditingId(null)
        setFitting(true)
        notify('Fluxo importado. Bem-vindo de volta!')
      } catch {
        notify('Esse arquivo não parece um fluxo do flui. Confira o JSON e tente de novo.', { tone: 'error' })
      }
    }
    reader.readAsText(file)
  }, [apply, notify])

  const handleExport = useCallback(() => {
    const payload = { ...docRef.current, exportedAt: new Date().toISOString(), app: 'flui' }
    downloadJSON(payload, `${slug(docRef.current.title)}.flui.json`)
    notify('Fluxo exportado em JSON.')
  }, [docRef, notify])

  const applyTemplate = useCallback((template) => {
    const next = createDocFromTemplate(template)
    apply(() => next)
    setSelected(null)
    setEditingId(null)
    setModal(null)
    setFitting(true)
    notify(template ? `Modelo “${template.short}” aplicado.` : 'Um novo fluxo, em branco.')
  }, [apply, notify])

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      notify('Link do estúdio copiado.')
    } catch {
      notify('Não consegui copiar. Você pode copiar a URL direto do navegador.', { tone: 'error' })
    }
  }, [notify])

  const handleClear = useCallback(() => {
    apply(() => createBlankDoc())
    setSelected(null)
    setEditingId(null)
    setFitting(true)
    notify('Tela limpa. Agora é sua.', { actionLabel: 'Desfazer', onAction: undo })
  }, [apply, notify, undo])

  const handleTitleChange = useCallback((value) => {
    apply((prev) => ({ ...prev, title: value }), { key: 'doc-title' })
  }, [apply])

  const handleNodeDoubleClick = useCallback((node) => {
    setSelected({ type: 'node', id: node.id })
    if (node.type === 'text') setEditingId(node.id)
  }, [])

  const handleNodeTextChange = useCallback((value) => {
    if (!editingId) return
    apply((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === editingId ? { ...n, text: value } : n)),
    }), { key: `node-text:${editingId}` })
  }, [editingId, apply])

  const centerOnWorld = useCallback((x, y) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const v = viewRef.current
    const panel = window.innerWidth > 900 && selected ? 360 : 0
    commitView({
      ...v,
      x: (rect.width - panel) / 2 - x * v.zoom,
      y: rect.height / 2 - y * v.zoom,
    })
  }, [selected, commitView])

  useEffect(() => {
    if (!selected) return
    const exists = selected.type === 'node'
      ? doc.nodes.some((n) => n.id === selected.id)
      : doc.edges.some((e) => e.id === selected.id)
    if (!exists) {
      setSelected(null)
      setEditingId(null)
    }
  }, [doc, selected])

  useEffect(() => {
    if (editingId && !doc.nodes.some((n) => n.id === editingId)) setEditingId(null)
  }, [doc.nodes, editingId])

  useEffect(() => {
    if (!modal) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [modal])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return undefined
    const distance = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)

    const onTouchStart = (e) => {
      if (e.touches.length < 2) return
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const a = e.touches[0]
      const b = e.touches[1]
      const mid = {
        x: (a.clientX + b.clientX) / 2 - rect.left,
        y: (a.clientY + b.clientY) / 2 - rect.top,
      }
      const v = viewRef.current
      pinchRef.current = {
        startDist: Math.max(1, distance(a, b)),
        startZoom: v.zoom,
        wx: (mid.x - v.x) / v.zoom,
        wy: (mid.y - v.y) / v.zoom,
      }
      document.body.classList.add('is-pinching')
    }

    const onTouchMove = (e) => {
      const pinch = pinchRef.current
      if (!pinch || e.touches.length < 2) return
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const a = e.touches[0]
      const b = e.touches[1]
      const mid = {
        x: (a.clientX + b.clientX) / 2 - rect.left,
        y: (a.clientY + b.clientY) / 2 - rect.top,
      }
      const zoom = clamp(pinch.startZoom * (distance(a, b) / pinch.startDist), 0.18, 2.3)
      commitView({
        x: mid.x - pinch.wx * zoom,
        y: mid.y - pinch.wy * zoom,
        zoom,
      })
    }

    const onTouchEnd = (e) => {
      if (e.touches.length === 0) {
        pinchRef.current = null
        document.body.classList.remove('is-pinching')
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      document.body.classList.remove('is-pinching')
    }
  }, [commitView])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return undefined
    const onWheel = (e) => {
      if (modal) return
      e.preventDefault()
      const delta = e.deltaY * (e.deltaMode === 1 ? 16 : 1)
      const factor = Math.exp(-delta * 0.00125)
      zoomAt(e.clientX, e.clientY, factor)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt, modal])

  useEffect(() => {
    const onKeyDown = (e) => {
      const typing = isTextInput(e.target)
      if (e.key === 'Escape') {
        if (modal) return
        if (connecting) {
          cancelConnecting()
          return
        }
        if (editingId) {
          setEditingId(null)
          return
        }
        if (selected) setSelected(null)
        return
      }
      if (modal) return
      if (e.code === 'Space' && !typing) {
        e.preventDefault()
        setSpaceHeld(true)
        return
      }
      if (typing) return

      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        if (e.shiftKey) redo()
        else undo()
        return
      }
      if (meta && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        duplicateSelection()
        return
      }
      if (meta && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handleExport()
        return
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        removeSelection()
        return
      }
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoomCenter(1.16)
        return
      }
      if (e.key === '-') {
        e.preventDefault()
        zoomCenter(1 / 1.16)
        return
      }
      if (e.key === '0') {
        e.preventDefault()
        fitView()
        return
      }
      if (e.key === '1') {
        e.preventDefault()
        setZoom100()
        return
      }
      if (e.key === '?') {
        e.preventDefault()
        setModal('help')
      }
    }
    const onKeyUp = (e) => {
      if (e.code === 'Space') setSpaceHeld(false)
    }
    const onBlur = () => setSpaceHeld(false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [
    modal, connecting, editingId, selected, cancelConnecting, redo, undo,
    duplicateSelection, handleExport, removeSelection, zoomCenter, fitView, setZoom100,
  ])

  const edgeQuickPosition = useMemo(() => {
    if (!selectedEdge || modal) return null
    const from = doc.nodes.find((n) => n.id === selectedEdge.from)
    const to = doc.nodes.find((n) => n.id === selectedEdge.to)
    if (!from || !to) return null
    const source = { ...from, w: sizes[from.id]?.w || from.w, h: sizes[from.id]?.h || nodeHeight(from) }
    const target = { ...to, w: sizes[to.id]?.w || to.w, h: sizes[to.id]?.h || nodeHeight(to) }
    const geo = getBezier(source, target)
    // keep the quick palette clickable beside the inspector (never underneath it)
    const maxX = window.innerWidth - (window.innerWidth > 900 ? 548 : 210)
    const x = clamp(view.x + geo.mx * view.zoom, 215, Math.max(215, maxX))
    const y = clamp(view.y + geo.my * view.zoom, 140, window.innerHeight - 120)
    return { x, y }
  }, [selectedEdge, doc.nodes, sizes, view, modal])

  const outEdgesByNode = useMemo(() => {
    const map = {}
    for (const edge of doc.edges) {
      if (!map[edge.from]) map[edge.from] = []
      map[edge.from].push(edge)
    }
    return map
  }, [doc.edges])

  const nodeTargetId = connecting?.targetId || null
  const hasNodes = doc.nodes.length > 0

  return (
    <div className={`app ${modal ? 'has-modal' : ''}`}>
      <div className="canvas-atmosphere" aria-hidden="true">
        <span className="atmo atmo-a" />
        <span className="atmo atmo-b" />
        <span className="atmo atmo-c" />
      </div>

      <main
        ref={canvasRef}
        className={`canvas ${panning ? 'is-panning' : ''} ${spaceHeld ? 'is-space' : ''} ${connecting ? 'is-connecting' : ''}`}
        onPointerDown={handleCanvasPointerDown}
        onDoubleClick={handleCanvasDoubleClick}
      >
        <div
          className="grid"
          style={{
            backgroundSize: `${32 * view.zoom}px ${32 * view.zoom}px`,
            backgroundPosition: `${view.x}px ${view.y}px`,
            opacity: Math.min(0.9, 0.38 + view.zoom * 0.42),
          }}
          aria-hidden="true"
        />
        <div
          className="world"
          style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})` }}
        >
          <EdgeLayer
            nodes={doc.nodes}
            edges={doc.edges}
            sizes={sizes}
            selectedEdgeId={selected?.type === 'edge' ? selected.id : null}
            connecting={connecting}
            onSelectEdge={(id) => { setSelected({ type: 'edge', id }); setEditingId(null) }}
          />
          {doc.nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              selected={selected?.type === 'node' && selected.id === node.id}
              isTarget={nodeTargetId === node.id}
              connecting={Boolean(connecting)}
              editing={editingId === node.id}
              outEdges={outEdgesByNode[node.id] || []}
              onMeasure={handleMeasure}
              onPointerDown={handleNodePointerDown}
              onStartConnect={startConnect}
              onOpen={(n) => { setSelected({ type: 'node', id: n.id }); setEditingId(null) }}
              onDoubleClick={handleNodeDoubleClick}
              onTextChange={handleNodeTextChange}
              onEndEdit={() => setEditingId(null)}
              onPickMedia={pickMedia}
            />
          ))}
        </div>

        {!hasNodes && (
          <div className="empty-canvas">
            <span>Seu fluxo começa com um balão.</span>
            <button type="button" onClick={() => addNode('text')}>Criar primeira mensagem</button>
          </div>
        )}
      </main>

      <TopBar
        title={doc.title}
        onTitleChange={handleTitleChange}
        saveState={saveState}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onTemplates={() => setModal('templates')}
        onTest={() => setModal('preview')}
        onExport={handleExport}
        onImport={() => importInputRef.current?.click()}
        onCopyLink={handleCopyLink}
        onHelp={() => setModal('help')}
        onClear={handleClear}
      />

      <div className="mobile-hint" aria-hidden="true">arraste para explorar · pinça para zoom</div>

      <ToolRail onAdd={addNode} onDeselect={() => { setSelected(null); setEditingId(null) }} />

      <div className="canvas-hints hide-mobile">
        <span><MousePointer2 size={12} /> arraste para mover</span>
        <i />
        <span><ZoomIn size={12} /> scroll para dar zoom</span>
        <button type="button" onClick={() => setModal('help')} aria-label="Ver atalhos">?</button>
      </div>

      <ZoomDock
        zoom={view.zoom}
        onZoomIn={() => zoomCenter(1.18)}
        onZoomOut={() => zoomCenter(1 / 1.18)}
        onReset={setZoom100}
        onFit={fitView}
      />

      {hasNodes && (
        <Minimap
          nodes={doc.nodes}
          edges={doc.edges}
          sizes={sizes}
          view={view}
          canvasSize={canvasSize}
          shifted={Boolean(selected)}
          onCenter={centerOnWorld}
        />
      )}

      <Inspector
        selected={selected}
        node={selectedNode}
        edge={selectedEdge}
        sourceNode={edgeSource}
        targetNode={edgeTarget}
        outEdges={selectedOutEdges}
        nodes={doc.nodes}
        onClose={() => { setSelected(null); setEditingId(null) }}
        onPatchNode={patchSelectedNode}
        onPatchEdge={patchSelectedEdge}
        onDelete={removeSelection}
        onDuplicate={duplicateSelection}
        onPickMedia={pickMedia}
        onUploadFile={uploadFileToNode}
        onRemoveMedia={removeMedia}
        onRecorded={handleRecorded}
        onSelectEdge={(id) => { setSelected({ type: 'edge', id }); setEditingId(null) }}
        onError={(message) => notify(message, { tone: 'error' })}
      />

      {selectedEdge && edgeQuickPosition && (
        <EdgeQuickBar
          edge={selectedEdge}
          position={edgeQuickPosition}
          onChangeColor={changeSelectedEdgeColor}
          onDelete={removeSelection}
        />
      )}

      {modal === 'templates' && (
        <TemplatesModal
          onClose={() => setModal(null)}
          onApply={applyTemplate}
          onBlank={() => applyTemplate(null)}
          currentTemplateId={doc.templateId}
        />
      )}
      {modal === 'help' && <HelpModal onClose={() => setModal(null)} />}
      {modal === 'preview' && (
        <PreviewModal
          nodes={doc.nodes}
          edges={doc.edges}
          docTitle={doc.title}
          onClose={() => setModal(null)}
        />
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <input ref={fileInputRef} type="file" hidden onChange={handleFilePicked} />
      <input ref={importInputRef} type="file" accept=".json,application/json,.flui.json" hidden onChange={handleImportFile} />
      <div className={`drag-status ${draggingId ? 'is-on' : ''}`}>{draggingId ? 'posicionando balão…' : ''}</div>
    </div>
  )
}
