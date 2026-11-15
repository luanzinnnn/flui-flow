import React from 'react'
import { Frame, Minus, Plus } from 'lucide-react'

export default function ZoomDock({ zoom, onZoomIn, onZoomOut, onReset, onFit }) {
  return (
    <div className="zoom-dock" role="group" aria-label="Zoom e visualização">
      <button type="button" className="zoom-btn" onClick={onZoomOut} aria-label="Diminuir zoom" title="Diminuir zoom (−)">
        <Minus size={15} />
      </button>
      <button type="button" className="zoom-value" onClick={onReset} title="Redefinir para 100%">
        {Math.round(zoom * 100)}%
      </button>
      <button type="button" className="zoom-btn" onClick={onZoomIn} aria-label="Aumentar zoom" title="Aumentar zoom (+)">
        <Plus size={15} />
      </button>
      <span className="zoom-sep" />
      <button type="button" className="zoom-btn" onClick={onFit} aria-label="Enquadrar fluxo" title="Enquadrar fluxo (0)">
        <Frame size={15} />
      </button>
    </div>
  )
}
