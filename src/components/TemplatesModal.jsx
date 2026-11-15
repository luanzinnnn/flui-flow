import React, { useEffect, useMemo } from 'react'
import { ArrowRight, AudioLines, Film, GitBranch, Image as ImageIcon, LayoutTemplate, Plus, Sparkles, X } from 'lucide-react'
import { ESTIMATED_HEIGHT, TEMPLATES } from '../data/flowData'

function FlowThumb({ template }) {
  const model = useMemo(() => {
    const nodes = template.nodes
    let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
    for (const n of nodes) {
      const h = ESTIMATED_HEIGHT[n.type] || 180
      minX = Math.min(minX, n.x)
      minY = Math.min(minY, n.y)
      maxX = Math.max(maxX, n.x + n.w)
      maxY = Math.max(maxY, n.y + h)
    }
    const width = 340
    const height = 154
    const pad = 22
    const scale = Math.min((width - pad * 2) / (maxX - minX), (height - pad * 2) / (maxY - minY))
    const ox = (width - (maxX - minX) * scale) / 2 - minX * scale
    const oy = (height - (maxY - minY) * scale) / 2 - minY * scale
    const boxes = {}
    for (const n of nodes) {
      const h = ESTIMATED_HEIGHT[n.type] || 180
      boxes[n.id] = {
        x: n.x * scale + ox,
        y: n.y * scale + oy,
        w: n.w * scale,
        h: h * scale,
        node: n,
      }
    }
    return { boxes, width, height }
  }, [template])

  return (
    <svg className="template-thumb" viewBox={`0 0 ${model.width} ${model.height}`} role="img" aria-label={`Prévia do modelo ${template.name}`}>
      <defs>
        {template.palette.map((color) => (
          <marker key={color} id={`thumb-arrow-${template.id}-${color.replace('#', '')}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        ))}
      </defs>
      {template.edges.map((edge) => {
        const from = model.boxes[edge.from]
        const to = model.boxes[edge.to]
        if (!from || !to) return null
        const sx = from.x + from.w
        const sy = from.y + from.h / 2
        const tx = to.x
        const ty = to.y + to.h / 2
        const dx = Math.max(20, Math.abs(tx - sx) * 0.45)
        const d = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
        return (
          <path
            key={edge.id}
            d={d}
            fill="none"
            stroke={edge.color}
            strokeOpacity="0.6"
            strokeWidth="1.3"
            strokeDasharray={edge.dashed ? '3 3' : undefined}
            markerEnd={`url(#thumb-arrow-${template.id}-${edge.color.replace('#', '')})`}
          />
        )
      })}
      {Object.values(model.boxes).map(({ x, y, w, h, node }) => (
        node.type === 'start' ? (
          <g key={node.id}>
            <rect x={x} y={y} width={w} height={Math.max(8, h)} rx={4} fill="#a3e635" fillOpacity=".8" />
          </g>
        ) : (
          <g key={node.id}>
            <rect x={x} y={y} width={w} height={h} rx="5" fill="#171923" stroke={`${node.accent}55`} strokeWidth="1" />
            <rect x={x + 5} y={y + 6} width={Math.min(30, w * 0.36)} height="3" rx="1.5" fill={node.accent} fillOpacity=".85" />
            <rect x={x + 5} y={y + 13} width={Math.max(8, w - 16)} height="2.5" rx="1.25" fill="white" fillOpacity=".16" />
            <rect x={x + 5} y={y + 18} width={Math.max(8, w - 28)} height="2.5" rx="1.25" fill="white" fillOpacity=".1" />
          </g>
        )
      ))}
    </svg>
  )
}

export default function TemplatesModal({ onClose, onApply, onBlank, currentTemplateId }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onPointerDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal templates-modal" role="dialog" aria-modal="true" aria-labelledby="templates-title">
        <header className="modal-head">
          <div>
            <span className="modal-eyebrow"><LayoutTemplate size={13} /> galeria de fluxos</span>
            <h2 id="templates-title">Comece com uma boa <em>conversa.</em></h2>
            <p>Modelos prontos para editar, misturar e chamar de seu.</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar galeria"><X size={18} /></button>
        </header>

        <div className="template-grid">
          {TEMPLATES.map((template) => {
            const media = template.nodes.flatMap((n) => (n.blocks || []).filter((b) => ['audio', 'image', 'video'].includes(b.kind)))
            const kinds = new Set(media.map((b) => b.kind))
            return (
              <button
                type="button"
                key={template.id}
                className={`template-card ${currentTemplateId === template.id ? 'is-current' : ''}`}
                onClick={() => onApply(template)}
              >
                <div className="template-visual">
                  <FlowThumb template={template} />
                  <span className="template-tag">{template.tag}</span>
                  {currentTemplateId === template.id && <span className="current-pill">em uso</span>}
                </div>
                <div className="template-body">
                  <div className="template-meta">
                    <span>{template.short}</span>
                    <span>{template.nodes.length} balões</span>
                  </div>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <div className="template-foot">
                    <div className="template-media">
                      {kinds.has('audio') && <AudioLines size={13} />}
                      {kinds.has('image') && <ImageIcon size={13} />}
                      {kinds.has('video') && <Film size={13} />}
                      {template.nodes.some((n) => n.type === 'condition') && <GitBranch size={13} />}
                      <span>{media.length ? `${media.length} ${media.length === 1 ? 'mídia' : 'mídias'}` : 'só texto'}</span>
                    </div>
                    <span className="template-open">usar modelo <ArrowRight size={14} /></span>
                  </div>
                </div>
              </button>
            )
          })}

          <button type="button" className="blank-card" onClick={onBlank}>
            <span className="blank-icon"><Plus size={20} /></span>
            <div>
              <h3>Folha em branco</h3>
              <p>Um início, infinitas possibilidades.</p>
            </div>
            <Sparkles size={18} className="blank-spark" />
          </button>
        </div>
        <footer className="modal-foot">
          <span><Sparkles size={13} /> Aplicar um modelo substitui o fluxo atual.</span>
          <span>Você pode desfazer com <kbd>⌘</kbd><kbd>Z</kbd>.</span>
        </footer>
      </div>
    </div>
  )
}
