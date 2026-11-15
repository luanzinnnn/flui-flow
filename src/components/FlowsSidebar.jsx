import React, { useEffect, useRef, useState } from 'react'
import { Check, Copy, Layers, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import FlowPreview from './FlowPreview'
import { relativeTime, sortFlowSummaries } from '../lib/flowStore'

export default function FlowsSidebar({
  open, flows, activeId, saveState, onClose, onOpenFlow, onCreateFlow,
  onDuplicateFlow, onDeleteFlow, onRenameFlow, onSaveNow,
}) {
  const [renamingId, setRenamingId] = useState(null)
  const [renameDraft, setRenameDraft] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const renameCancelledRef = useRef(false)
  const ordered = sortFlowSummaries(flows, activeId)

  useEffect(() => {
    if (open) return
    setRenamingId(null)
    setRenameDraft('')
    setConfirmDeleteId(null)
    renameCancelledRef.current = false
  }, [open])

  const cancelRename = () => {
    renameCancelledRef.current = true
    setRenamingId(null)
    setRenameDraft('')
  }

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
    <>
      <div className={`flows-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`flows-sidebar ${open ? 'is-open' : ''}`}
        aria-label="Fluxos salvos"
        aria-hidden={!open}
      >
        <header className="flows-side-head">
          <div>
            <span className="flows-side-eyebrow"><Layers size={11} /> sua biblioteca</span>
            <h2>Fluxos salvos</h2>
            <p>Abra outro, salve este ou comece um novo.</p>
          </div>
          <button type="button" className="flows-side-close" onClick={onClose} aria-label="Fechar fluxos salvos">
            <X size={16} />
          </button>
        </header>

        <div className="flows-side-actions">
          <button type="button" className="flows-side-new" onClick={onCreateFlow}>
            <Plus size={15} /> Novo fluxo
          </button>
          <button type="button" className="flows-side-save" onClick={onSaveNow}>
            {saveState === 'saving' ? <Save size={14} className="spin-soft" /> : <Check size={14} />}
            {saveState === 'saving' ? 'salvando…' : 'Salvar agora'}
          </button>
        </div>

        <div className="flows-side-scroll">
          <div className="flows-side-count">
            <span>{ordered.length} {ordered.length === 1 ? 'fluxo salvo' : 'fluxos salvos'}</span>
            <span>mais recente primeiro</span>
          </div>

          <div className="flows-side-list">
            {ordered.map((flow) => {
              const isActive = flow.id === activeId
              const isRenaming = renamingId === flow.id
              const isConfirming = confirmDeleteId === flow.id
              return (
                <article className={`flow-side-row ${isActive ? 'is-active' : ''}`} key={flow.id}>
                  <div className="flow-side-main">
                    <button
                      type="button"
                      className="flow-side-preview"
                      onClick={() => onOpenFlow(flow.id)}
                      aria-label={`Abrir fluxo ${flow.title}`}
                    >
                      <FlowPreview flow={flow} />
                    </button>
                    <div className="flow-side-copy">
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
                        <button type="button" className="flow-side-title" onClick={() => onOpenFlow(flow.id)}>
                          <h3 title={flow.title}>{flow.title}</h3>
                        </button>
                      )}
                      <div className="flow-side-meta">
                        <span>{flow.nodeCount} {flow.nodeCount === 1 ? 'balão' : 'balões'}</span>
                        <i />
                        <span>{flow.edgeCount} {flow.edgeCount === 1 ? 'ligação' : 'ligações'}</span>
                        <i />
                        <span>{relativeTime(flow.updatedAt)}</span>
                      </div>
                      {isActive && <span className="flow-side-active"><i /> em uso</span>}
                    </div>
                  </div>

                  {isConfirming ? (
                    <div className="flow-side-confirm">
                      <span>Excluir “{flow.title}”?</span>
                      <button type="button" onClick={() => setConfirmDeleteId(null)}>não</button>
                      <button type="button" className="danger" onClick={() => { onDeleteFlow(flow.id); setConfirmDeleteId(null) }}>excluir</button>
                    </div>
                  ) : (
                    <div className="flow-side-row-actions">
                      <button type="button" className="flow-side-open-btn" onClick={() => onOpenFlow(flow.id)}>
                        {isActive ? 'Continuar' : 'Abrir'}
                      </button>
                      <button type="button" className="flow-side-icon" title="Renomear fluxo" aria-label={`Renomear ${flow.title}`} onClick={() => startRename(flow)}>
                        <Pencil size={12} />
                      </button>
                      <button type="button" className="flow-side-icon" title="Duplicar fluxo" aria-label={`Duplicar ${flow.title}`} onClick={() => onDuplicateFlow(flow.id)}>
                        <Copy size={12} />
                      </button>
                      <button type="button" className="flow-side-icon danger" title="Excluir fluxo" aria-label={`Excluir ${flow.title}`} onClick={() => setConfirmDeleteId(flow.id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>

        <footer className="flows-side-foot">
          <span><i /> salvo neste navegador</span>
          <span><kbd>F</kbd> abre e fecha</span>
        </footer>
      </aside>
    </>
  )
}
