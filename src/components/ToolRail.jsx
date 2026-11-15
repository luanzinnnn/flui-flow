import React from 'react'
import { Clock3, GitBranch, Image as ImageIcon, MousePointer2, Type, Video, Mic } from 'lucide-react'

const TOOLS = [
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'audio', label: 'Áudio', icon: Mic },
  { type: 'image', label: 'Foto', icon: ImageIcon },
  { type: 'video', label: 'Vídeo', icon: Video },
  { type: 'condition', label: 'Condição', icon: GitBranch },
  { type: 'delay', label: 'Espera', icon: Clock3 },
]

export default function ToolRail({ onAdd, onDeselect }) {
  return (
    <nav className="toolrail" aria-label="Adicionar balões">
      <button type="button" className="tool is-active" onClick={onDeselect} data-tooltip="Selecionar" aria-label="Ferramenta de seleção">
        <MousePointer2 size={18} />
      </button>
      <span className="rail-sep" />
      {TOOLS.map(({ type, label, icon: Icon }) => (
        <button
          type="button"
          key={type}
          className="tool"
          onClick={() => onAdd(type)}
          data-tooltip={`Adicionar ${label.toLowerCase()}`}
          aria-label={`Adicionar ${label}`}
        >
          <Icon size={18} />
        </button>
      ))}
    </nav>
  )
}
