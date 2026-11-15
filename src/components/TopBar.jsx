import React, { useEffect, useRef, useState } from 'react'
import {
  Download, FolderOpen, HelpCircle, LayoutGrid, Link2, MoreHorizontal, Play,
  Redo2, RotateCcw, Sparkles, Undo2, Upload,
} from 'lucide-react'
import Logo from './Logo'

export default function TopBar({
  title, onTitleChange, saveState, onUndo, onRedo, canUndo, canRedo,
  onTemplates, onTest, onExport, onImport, onCopyLink, onHelp, onClear,
  onLibrary, libraryOpen, assetCount,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const item = (icon, label, action, extra = '') => (
    <button
      type="button"
      className="menu-item"
      onClick={() => { setMenuOpen(false); action() }}
    >
      {icon}
      <span>{label}</span>
      {extra && <kbd>{extra}</kbd>}
    </button>
  )

  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand">
          <Logo size={34} />
          <span className="wordmark">flui<span>.</span></span>
          <span className="beta-pill">beta</span>
        </div>
        <span className="topbar-divider" />
        <div className="doc-block">
          <input
            className="doc-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            aria-label="Nome do fluxo"
            spellCheck="false"
          />
          <span className={`save-state ${saveState}`}>
            <span className="save-dot" />
            {saveState === 'saving' ? 'salvando…' : saveState === 'error' ? 'não salvou' : 'salvo'}
          </span>
        </div>
      </div>

      <div className="top-actions">
        <div className="undo-group">
          <button type="button" className="icon-btn" onClick={onUndo} disabled={!canUndo} title="Desfazer (⌘Z)" aria-label="Desfazer">
            <Undo2 size={17} />
          </button>
          <button type="button" className="icon-btn" onClick={onRedo} disabled={!canRedo} title="Refazer (⇧⌘Z)" aria-label="Refazer">
            <Redo2 size={17} />
          </button>
        </div>
        <button type="button" className="ghost-btn hide-mobile" onClick={onTemplates}>
          <LayoutGrid size={16} />
          <span>Modelos</span>
        </button>
        <button
          type="button"
          className={`ghost-btn hide-mobile ${libraryOpen ? 'is-active' : ''}`}
          onClick={onLibrary}
          aria-expanded={libraryOpen}
        >
          <FolderOpen size={16} />
          <span>Mídias</span>
          {assetCount > 0 && <span className="ghost-count">{assetCount}</span>}
        </button>
        <div className="menu-wrap" ref={menuRef}>
          <button
            type="button"
            className={`icon-btn menu-trigger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Mais opções"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <div className="menu-heading">Fluxo</div>
              {item(<LayoutGrid size={15} />, 'Modelos de fluxo', onTemplates)}
              {item(<FolderOpen size={15} />, 'Biblioteca de mídias', onLibrary, 'M')}
              {item(<Download size={15} />, 'Exportar JSON', onExport)}
              {item(<Upload size={15} />, 'Importar JSON', onImport)}
              {item(<Link2 size={15} />, 'Copiar link do estúdio', onCopyLink)}
              <div className="menu-sep" />
              {item(<HelpCircle size={15} />, 'Atalhos e dicas', onHelp, '?')}
              {item(<RotateCcw size={15} />, 'Começar do zero', onClear)}
              <div className="menu-foot">
                <Sparkles size={12} />
                feito para fluxos que fluem
              </div>
            </div>
          )}
        </div>
        <button type="button" className="test-button" onClick={onTest} aria-label="Testar fluxo">
          <Play size={15} fill="currentColor" />
          <span>Testar fluxo</span>
        </button>
      </div>
    </header>
  )
}
