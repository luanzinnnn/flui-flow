import { nodeHeight } from '../data/flowData'

export const FLOW_LIBRARY_KEY = 'flui:flows:v1'

export function createFlowId() {
  return `flow-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`
}

export function makeFlowRecord({ doc, view, id, createdAt, updatedAt }) {
  const now = Date.now()
  return {
    id: id || createFlowId(),
    doc,
    view: view || null,
    createdAt: createdAt || now,
    updatedAt: updatedAt || now,
  }
}

function isValidRecord(record) {
  return Boolean(
    record
    && typeof record.id === 'string'
    && record.doc
    && Array.isArray(record.doc.nodes)
    && Array.isArray(record.doc.edges)
  )
}

export function loadFlowLibrary() {
  try {
    const raw = localStorage.getItem(FLOW_LIBRARY_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.flows)) return null
    const flows = parsed.flows.filter(isValidRecord).map((record) => ({
      ...record,
      createdAt: Number(record.createdAt) || Date.now(),
      updatedAt: Number(record.updatedAt) || Date.now(),
      view: record.view && Number.isFinite(record.view.x) && Number.isFinite(record.view.y) && Number.isFinite(record.view.zoom)
        ? record.view
        : null,
    }))
    if (!flows.length) return null
    const activeId = flows.some((flow) => flow.id === parsed.activeId) ? parsed.activeId : flows[0].id
    return { version: 1, activeId, flows }
  } catch {
    return null
  }
}

export function saveFlowLibrary(library) {
  try {
    localStorage.setItem(FLOW_LIBRARY_KEY, JSON.stringify(library))
    return true
  } catch {
    return false
  }
}

export function summarizeFlow(record) {
  const doc = record?.doc || {}
  const nodes = Array.isArray(doc.nodes) ? doc.nodes : []
  const edges = Array.isArray(doc.edges) ? doc.edges : []
  const previewNodes = nodes.slice(0, 160).map((node) => ({
    id: node.id,
    type: node.type,
    x: node.x,
    y: node.y,
    w: node.w || 304,
    h: nodeHeight(node),
    accent: node.accent || '#a78bfa',
  }))
  const previewEdges = edges.slice(0, 240).map((edge) => ({
    id: edge.id,
    from: edge.from,
    to: edge.to,
    color: edge.color || '#8b5cf6',
  }))
  return {
    id: record.id,
    title: String(doc.title || '').trim() || 'Fluxo sem título',
    nodeCount: nodes.length,
    edgeCount: edges.length,
    mediaCount: nodes.reduce((total, node) => total + (node.blocks || []).filter((block) => ['audio', 'image', 'video'].includes(block.kind)).length, 0),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    preview: { nodes: previewNodes, edges: previewEdges },
  }
}

export function sortFlowSummaries(flows, activeId) {
  return [...flows].sort((a, b) => {
    if (a.id === activeId) return -1
    if (b.id === activeId) return 1
    return b.updatedAt - a.updatedAt
  })
}

export function uniqueFlowTitle(baseTitle, flows) {
  const cleanBase = String(baseTitle || 'Novo fluxo').trim() || 'Novo fluxo'
  const titles = new Set((flows || []).map((flow) => String(flow.doc?.title || '').trim()))
  if (!titles.has(cleanBase)) return cleanBase
  let index = 2
  while (titles.has(`${cleanBase} ${index}`)) index += 1
  return `${cleanBase} ${index}`
}

export function relativeTime(timestamp) {
  const diff = Math.max(0, Date.now() - Number(timestamp || 0))
  if (diff < 60_000) return 'agora'
  if (diff < 3_600_000) return `há ${Math.floor(diff / 60_000)} min`
  if (diff < 86_400_000) return `há ${Math.floor(diff / 3_600_000)} h`
  if (diff < 7 * 86_400_000) return `há ${Math.floor(diff / 86_400_000)} d`
  return new Date(timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}
