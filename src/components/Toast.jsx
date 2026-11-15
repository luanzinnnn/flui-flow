import React from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null
  return (
    <div className="toast-wrap">
      <div className={`toast ${toast.tone || ''}`} role="status">
        <span className="toast-icon"><Check size={14} /></span>
        <span className="toast-message">{toast.message}</span>
        {toast.actionLabel && (
          <button type="button" className="toast-action" onClick={toast.onAction}>
            {toast.actionLabel}
          </button>
        )}
        <button type="button" className="toast-close" onClick={onDismiss} aria-label="Fechar aviso">
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
