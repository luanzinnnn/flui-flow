import React from 'react'
import { Trash2 } from 'lucide-react'
import { EDGE_COLORS } from '../data/flowData'

export default function EdgeQuickBar({ edge, position, onChangeColor, onDelete }) {
  if (!edge) return null
  return (
    <div
      className="edge-quickbar"
      style={{ left: position.x, top: position.y }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <span className="quickbar-label">cor da ligação</span>
      <div className="quickbar-swatches">
        {EDGE_COLORS.slice(0, 6).map((color) => (
          <button
            key={color.value}
            type="button"
            className={`quick-swatch ${edge.color === color.value ? 'is-active' : ''}`}
            style={{ '--swatch': color.value }}
            onClick={() => onChangeColor(color.value)}
            aria-label={`Cor ${color.name}`}
            title={color.name}
          />
        ))}
      </div>
      <span className="quickbar-sep" />
      <button type="button" className="quick-delete" onClick={onDelete} aria-label="Excluir ligação" title="Excluir ligação">
        <Trash2 size={13} />
      </button>
    </div>
  )
}
