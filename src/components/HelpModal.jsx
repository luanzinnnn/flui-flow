import React, { useEffect } from 'react'
import { ArrowRight, Command, FolderOpen, Keyboard, Layers, Lock, MousePointer2, Save, Sparkles, Wand2, X } from 'lucide-react'

const SHORTCUTS = [
  ['Arrastar a tela', ['espaço', '+', 'arrastar']],
  ['Dar zoom', ['scroll']],
  ['Adicionar texto', ['duplo', 'clique']],
  ['Editar balão', ['duplo', 'clique']],
  ['Conectar', ['arrastar', 'alça']],
  ['Desfazer', ['⌘', 'Z']],
  ['Refazer', ['⇧', '⌘', 'Z']],
  ['Duplicar', ['⌘', 'D']],
  ['Biblioteca', ['M']],
  ['Copiloto', ['K']],
  ['Fluxos', ['F']],
  ['Salvar', ['⌘', 'S']],
  ['Enquadrar', ['0']],
  ['Fechar', ['esc']],
  ['Ajuda', ['?']],
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
            <span className="help-card-icon"><FolderOpen size={17} /></span>
            <h3>Mídias à mão</h3>
            <p>Abra a biblioteca pelo ícone de pasta (ou tecla M), envie uma vez e arraste para qualquer balão. Você também pode arrastar fotos, áudios, vídeos e arquivos .txt direto do seu computador para o canvas ou para dentro de um balão.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Layers size={17} /></span>
            <h3>Um balão, várias camadas</h3>
            <p>Misture texto, áudio, foto e vídeo no mesmo balão. Use as setas do painel para mudar a ordem de cada bloco.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Wand2 size={17} /></span>
            <h3>Copiloto DeepSeek</h3>
            <p>Abra o Copiloto (K), conecte sua chave e pergunte o que responder em cada balão. Ele lê o fluxo inteiro, os caminhos e o balão em foco. Você também pode anexar PDF, DOCX, XLSX ou arquivos de texto para ele ler e usar na resposta.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Lock size={17} /></span>
            <h3>Sua chave, seu controle</h3>
            <p>A chave da DeepSeek fica só na memória desta aba e é enviada direto para a API oficial. O fluxo é enviado apenas quando você pede uma resposta.</p>
          </div>
          <div className="help-card">
            <span className="help-card-icon"><Save size={17} /></span>
            <h3>Vários fluxos salvos</h3>
            <p>Clique no <strong>logo do flui</strong> (ou pressione F) para abrir a barra de fluxos: criar outro, voltar aos anteriores, duplicar ou renomear. Tudo salva automático neste navegador; o botão “salvo” também salva na hora.</p>
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
        <p className="help-foot">Dica: clique em um balão e use o painel da direita para montar o conteúdo, trocar a cor da ligação e organizar cada bloco.</p>
      </div>
    </div>
  )
}
