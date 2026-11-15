import React from 'react'
import { Clock3, FolderOpen, GitBranch, Image as ImageIcon, MousePointer2, Type, Video, Mic } from 'lucide-react'

const TOOLS = [
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'audio', label: 'Áudio', icon: Mic },
  { type: 'image', label: 'Foto', icon: ImageIcon },
  { type: 'video', label: 'Vídeo', icon: Video },
  { type: 'condition', label: 'Condição', icon: GitBranch },
  { type: 'delay', label: 'Espera', icon: Clock3 },
]

export default function ToolRail({
  onAdd, onDeselect, onToggleLibrary, libraryOpen, assetCount,
}) {
  return (
    <nav className="toolrail" aria-label="Adicionar balões e abrir mídias">
      <button
        type="button"
        className={`tool ${libraryOpen ? '' : 'is-active'}`}
        onClick={onDeselect}
        data-tooltip="Selecionar"
        aria-label="Ferramenta de seleção"
      >
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
      <span className="rail-sep" />
      <button
        type="button"
        className={`tool library-tool ${libraryOpen ? 'is-active library-active' : ''}`}
        onClick={onToggleLibrary}
        data-tooltip="Biblioteca de mídias"
        aria-label="Abrir biblioteca de mídias"
        aria-expanded={libraryOpen}
      >
        <FolderOpen size={18} />
        {assetCount > 0 && <span className="rail-badge">{assetCount > 9 ? '9+' : assetCount}</span>}
      </button>
    </nav>
  )
}
