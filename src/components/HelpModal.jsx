import React, { useEffect } from 'react'
import { ArrowRight, Command, Keyboard, MousePointer2, Sparkles, X } from 'lucide-react'

const SHORTCUTS = [
  ['Arrastar a tela', ['espaço', '+', 'arrastar']],
  ['Dar zoom', ['scroll']],
  ['Adicionar texto', ['duplo', 'clique']],
  ['Editar balão', ['duplo', 'clique']],
  ['Conectar', ['arrastar', 'alça']],
  ['Desfazer', ['⌘', 'Z']],
  ['Refazer', ['⇧', '⌘', 'Z']],
  ['Duplicar', ['⌘', 'D']],
  ['Enquadrar', ['0']],
  ['Apagar', ['delete']],
]

export default function HelpModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onPointerDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <header className="modal-head">
          <div>
            <span className="modal-eyebrow"><Keyboard size={13} /> atalhos e dicas</span>
            <h2 id="help-title">Tudo flui melhor <em>assim.</em></h2>
            <p>O básico para desenhar, conectar e testar em segundos.</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar atalhos"><X size={18} /></button>
        </header>

        <div className="help-grid">
          <div className="help-card">
            <span className="help-card-icon"><MousePointer2 size={17} /></span>
            <h3>Mova sem medo</h3>
            <p>Arraste qualquer espaço vazio para navegar. Use o scroll para dar zoom e a barra de espaço para mover com precisão.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><ArrowRight size={17} /></span>
            <h3>Ligue os pontos</h3>
            <p>Passe o mouse em um balão e arraste a bolinha à direita até outro balão. Solte no vazio para criar um novo já conectado.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Sparkles size={17} /></span>
            <h3>Teste de verdade</h3>
            <p>Abra “Testar fluxo” para percorrer os caminhos, ouvir áudios e assistir aos vídeos como seu cliente faria.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Command size={17} /></span>
            <h3>Salvamento automático</h3>
            <p>Cada edição fica salva neste navegador. Exporte um JSON quando quiser levar o fluxo para outro lugar.</p>
          </div>
        </div>

        <div className="shortcut-block">
          <div className="shortcut-head">
            <span>atalhos</span>
            <span>para voar</span>
          </div>
          <div className="shortcut-grid">
            {SHORTCUTS.map(([label, keys]) => (
              <div className="shortcut-row" key={label}>
                <span>{label}</span>
                <span className="keys">
                  {keys.map((key) => <kbd key={key}>{key}</kbd>)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="help-foot">Dica: clique em um balão e use o painel da direita para trocar a cor da ligação, a mídia e o rótulo.</p>
      </div>
    </div>
  )
}
