import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { relativeTime, sortFlowSummaries } from '../lib/flowStore'

function FlowPreview({ flow }) {
  const geometry = useMemo(() => {
    const nodes = (flow.preview?.nodes || []).filter((n) => Number.isFinite(n.x) && Number.isFinite(n.y))
    const edges = flow.preview?.edges || []
    if (!nodes.length) return null
    const minX = Math.min(...nodes.map((n) => n.x))
    const minY = Math.min(...nodes.map((n) => n.y))
    const maxX = Math.max(...nodes.map((n) => n.x + (n.w || 220)))
    const maxY = Math.max(...nodes.map((n) => n.y + (n.h || 100)))
    const width = Math.max(1, maxX - minX)
    const height = Math.max(1, maxY - minY)
    const scale = Math.min(320 / width, 118 / height, 0.5)
    const offsetX = (340 - width * scale) / 2
    const offsetY = (150 - height * scale) / 2
    const map = new Map()
    for (const node of nodes) {
      const nx = offsetX + (node.x - minX) * scale
      const ny = offsetY + (node.y - minY) * scale
      map.set(node.id, { ...node, nx, ny, nw: Math.max(10, (node.w || 220) * scale), nh: Math.max(8, (node.h || 80) * scale) })
    }
    return { nodes: [...map.values()], map, edges }
  }, [flow.preview])

  if (!geometry) {
    return <div className="flow-save-empty">Fluxo em branco</div>
  }

  const pathFor = (edge) => {
    const a = geometry.map.get(edge.from)
    const b = geometry.map.get(edge.to)
    if (!a || !b) return ''
    const x1 = a.nx + a.nw
    const y1 = a.ny + a.nh / 2
    const x2 = b.nx
    const y2 = b.ny + b.nh / 2
    const dx = Math.max(24, Math.abs(x2 - x1) * 0.42)
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
  }

  return (
    <svg viewBox="0 0 340 150" className="flow-save-preview-svg" aria-hidden="true">
      <defs>
        <pattern id={`flow-dots-${flow.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.65" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect width="340" height="150" fill={`url(#flow-dots-${flow.id})`} />
      {geometry.edges.map((edge) => (
        <path
          key={edge.id}
          d={pathFor(edge)}
          fill="none"
          stroke={edge.color || '#8b5cf6'}
          strokeWidth="1.3"
          strokeOpacity="0.62"
        />
      ))}
      {geometry.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.nx}
            y={node.ny}
            width={node.nw}
            height={node.nh}
            rx={Math.min(5, node.nh / 2)}
            fill={node.type === 'start' ? 'rgba(163,230,53,0.18)' : `${node.accent || '#8b5cf6'}22`}
            stroke={node.type === 'start' ? '#a3e635' : (node.accent || '#8b5cf6')}
            strokeOpacity={node.type === 'start' ? 0.8 : 0.5}
            strokeWidth="1"
          />
          {node.nw > 24 && <line x1={node.nx + 5} x2={node.nx + Math.min(node.nw - 5, 38)} y1={node.ny + 7} y2={node.ny + 7} stroke={node.accent || '#8b5cf6'} strokeOpacity="0.55" strokeWidth="1" />}
        </g>
      ))}
    </svg>
  )
}

export default function FlowLibraryModal({
  flows, activeId, saveState, onClose, onOpenFlow, onCreateFlow,
  onDuplicateFlow, onDeleteFlow, onRenameFlow, onSaveNow,
}) {
  const [renamingId, setRenamingId] = useState(null)
  const [renameDraft, setRenameDraft] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const renameCancelledRef = useRef(false)
  const ordered = useMemo(() => sortFlowSummaries(flows, activeId), [flows, activeId])

  const cancelRename = () => {
    renameCancelledRef.current = true
    setRenamingId(null)
    setRenameDraft('')
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const tag = e.target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return
      if (renamingId) { cancelRename(); return }
      if (confirmDeleteId) { setConfirmDeleteId(null); return }
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, renamingId, confirmDeleteId])

  const startRename = (flow) => {
    setConfirmDeleteId(null)
    renameCancelledRef.current = false
    setRenamingId(flow.id)
    setRenameDraft(flow.title)
  }

  const commitRename = (flow) => {
    if (renameCancelledRef.current) {
      renameCancelledRef.current = false
      return
    }
    const value = renameDraft.trim()
    if (value && value !== flow.title) onRenameFlow(flow.id, value)
    setRenamingId(null)
    setRenameDraft('')
  }

  return (
    <div className="modal-backdrop flow-library-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <section className="modal flow-library-modal" role="dialog" aria-modal="true" aria-labelledby="flow-library-title">
        <div className="flow-library-head">
          <div>
            <span className="eyebrow">sua biblioteca</span>
            <h2 id="flow-library-title">Seus fluxos, salvos.</h2>
            <p>Cada fluxo fica guardado neste navegador. Abra um, duplique ou comece outro.</p>
          </div>
          <div className="flow-library-head-actions">
            <button type="button" className="flow-save-now" onClick={onSaveNow}>
              {saveState === 'saving' ? <Save size={14} className="spin-soft" /> : <Check size={14} />}
              {saveState === 'saving' ? 'salvando…' : 'Salvar agora'}
            </button>
            <button type="button" className="flow-new-head" onClick={onCreateFlow}>
              <Plus size={14} /> Novo fluxo
            </button>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar fluxos salvos">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flow-library-scroll">
          <div className="flow-save-grid">
            <button type="button" className="flow-new-card" onClick={onCreateFlow}>
              <span className="flow-new-icon"><Plus size={21} /></span>
              <strong>Novo fluxo</strong>
              <small>Em branco. Você pode aplicar um modelo depois.</small>
            </button>

            {ordered.map((flow) => {
              const isActive = flow.id === activeId
              const isRenaming = renamingId === flow.id
              const isConfirming = confirmDeleteId === flow.id
              return (
                <article className={`flow-save-card ${isActive ? 'is-active' : ''}`} key={flow.id}>
                  <button type="button" className="flow-save-preview" onClick={() => onOpenFlow(flow.id)} aria-label={`Abrir fluxo ${flow.title}`}>
                    <FlowPreview flow={flow} />
                    {isActive && <span className="flow-save-active"><i /> em uso</span>}
                    <span className="flow-save-open-mark"><ArrowUpRight size={13} /></span>
                  </button>
                  <div className="flow-save-info">
                    {isRenaming ? (
                      <input
                        className="flow-rename-input"
                        value={renameDraft}
                        onChange={(e) => setRenameDraft(e.target.value)}
                        onBlur={() => commitRename(flow)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() }
                          if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cancelRename() }
                        }}
                        maxLength={80}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                        aria-label="Nome do fluxo"
                      />
                    ) : (
                      <button type="button" className="flow-title-open" onClick={() => onOpenFlow(flow.id)}>
                        <h3 title={flow.title}>{flow.title}</h3>
                      </button>
                    )}
                    <div className="flow-save-meta">
                      <span>{flow.nodeCount} {flow.nodeCount === 1 ? 'balão' : 'balões'}</span>
                      <i />
                      <span>{flow.edgeCount} {flow.edgeCount === 1 ? 'ligação' : 'ligações'}</span>
                      <i />
                      <span>{relativeTime(flow.updatedAt)}</span>
                    </div>
                  </div>

                  {isConfirming ? (
                    <div className="flow-delete-confirm">
                      <span>Excluir este fluxo?</span>
                      <button type="button" onClick={() => setConfirmDeleteId(null)}>não</button>
                      <button type="button" className="danger" onClick={() => { onDeleteFlow(flow.id); setConfirmDeleteId(null) }}>
                        excluir
                      </button>
                    </div>
                  ) : (
                    <div className="flow-save-actions">
                      <button type="button" className="flow-open-btn" onClick={() => onOpenFlow(flow.id)}>
                        {isActive ? 'Continuar' : 'Abrir'}
                      </button>
                      <button type="button" className="flow-icon-action" title="Renomear fluxo" aria-label={`Renomear ${flow.title}`} onClick={() => startRename(flow)}>
                        <Pencil size={13} />
                      </button>
                      <button type="button" className="flow-icon-action" title="Duplicar fluxo" aria-label={`Duplicar ${flow.title}`} onClick={() => onDuplicateFlow(flow.id)}>
                        <Copy size={13} />
                      </button>
                      <button type="button" className="flow-icon-action danger" title="Excluir fluxo" aria-label={`Excluir ${flow.title}`} onClick={() => setConfirmDeleteId(flow.id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>

        <div className="flow-library-foot">
          <span>{ordered.length} {ordered.length === 1 ? 'fluxo salvo' : 'fluxos salvos'} neste navegador</span>
          <span>Salvo automaticamente · <kbd>esc</kbd> para fechar</span>
        </div>
      </section>
    </div>
  )
}
