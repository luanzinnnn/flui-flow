import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight, AudioLines, Clock3, Film, GitBranch, Image as ImageIcon,
  Layers, RotateCcw, Sparkles, X,
} from 'lucide-react'
import { useMediaSrc } from '../lib/useMediaSrc'
import { MEDIA_KINDS, blockHasMedia, getBlockKinds } from '../lib/content'
import AudioPlayer from './AudioPlayer'
import RichText from './RichText'

function ChatMediaBlock({ block, accent }) {
  const resolved = useMediaSrc(block.mediaId)
  const src = resolved || block.media?.src
  if (!src) return null

  if (block.kind === 'image') {
    return (
      <div className="chat-media chat-image">
        <img src={src} alt={block.media?.name || 'Imagem enviada'} />
        <span><ImageIcon size={11} /> imagem</span>
      </div>
    )
  }
  if (block.kind === 'video') {
    return (
      <div className="chat-media chat-video">
        <video src={src} poster={block.media?.poster} controls playsInline preload="metadata" />
        <span><Film size={11} /> vídeo</span>
      </div>
    )
  }
  if (block.kind === 'audio') {
    return (
      <div className="chat-audio">
        <AudioPlayer src={src} accent={accent || '#67e8f9'} compact />
      </div>
    )
  }
  return null
}

function ChatBlocks({ node }) {
  const blocks = node.blocks || []
  return (
    <div className="chat-blocks">
      {blocks.map((block) => {
        if (block.kind === 'text') {
          if (!String(block.text || '').trim()) return null
          return <p key={block.id}><RichText text={block.text} /></p>
        }
        if (!blockHasMedia(block)) return null
        return <ChatMediaBlock key={block.id} block={block} accent={node.accent} />
      })}
    </div>
  )
}

function TypePill({ type, kinds }) {
  const map = {
    condition: [GitBranch, 'condição'],
    delay: [Clock3, 'espera'],
    audio: [AudioLines, 'áudio'],
    image: [ImageIcon, 'foto'],
    video: [Film, 'vídeo'],
    text: null,
    content: [Layers, 'conteúdo'],
  }
  const key = kinds && kinds.length > 1 ? 'content' : (kinds?.[0] || type)
  const item = map[key]
  if (!item) return null
  const Icon = item[0]
  return <span className={`chat-type-pill type-${key}`}><Icon size={10} /> {item[1]}</span>
}

export default function PreviewModal({ nodes, edges, docTitle, onClose }) {
  const [messages, setMessages] = useState([])
  const [choices, setChoices] = useState([])
  const [typing, setTyping] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const chatRef = useRef(null)
  const timersRef = useRef([])
  const runRef = useRef(1)
  const startNode = useMemo(() => nodes.find((n) => n.type === 'start') || nodes[0], [nodes])
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes])
  const brand = useMemo(() => {
    const parts = String(docTitle || '').split('·')
    return parts.length > 1 ? parts[parts.length - 1].trim() : 'flui'
  }, [docTitle])

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  const schedule = (fn, delay) => {
    const run = runRef.current
    const timer = setTimeout(() => {
      if (run === runRef.current) fn()
    }, delay)
    timersRef.current.push(timer)
    return timer
  }

  const outgoing = (nodeId) => edges.filter((e) => e.from === nodeId && nodeMap[e.to])

  const enterNode = (node, delay = 620) => {
    if (!node) { setFinished(true); return }
    setCurrentId(node.id)
    setChoices([])
    setTyping(true)
    schedule(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${node.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          kind: node.type === 'delay' ? 'system' : 'bot',
          node,
        },
      ])
      const next = outgoing(node.id)
      if (!next.length) {
        setTyping(false)
        setFinished(true)
      } else if (next.length === 1) {
        // A single path should feel like a conversation flowing, not a slideshow.
        schedule(() => enterNode(nodeMap[next[0].to]), node.type === 'delay' ? 900 : 1050)
      } else {
        setTyping(false)
        setChoices(next)
      }
    }, node.type === 'delay' ? 900 : delay)
  }

  const restart = () => {
    runRef.current += 1
    clearTimers()
    setMessages([{ id: 'intro', kind: 'system', text: 'Fluxo iniciado' }])
    setChoices([])
    setTyping(false)
    setFinished(false)
    setCurrentId(startNode?.id || null)
    if (!startNode) {
      setFinished(true)
      return
    }
    const first = outgoing(startNode.id)
    if (!first.length) {
      setFinished(true)
      return
    }
    if (first.length === 1) {
      schedule(() => enterNode(nodeMap[first[0].to], 700), 300)
    } else {
      setChoices(first)
    }
  }

  useEffect(() => {
    restart()
    return () => {
      runRef.current += 1
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = chatRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, typing, choices, finished])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const choose = (edge) => {
    const target = nodeMap[edge.to]
    if (!target) return
    setChoices([])
    if (edge.label.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, kind: 'user', text: edge.label, edge },
      ])
    }
    setTyping(true)
    schedule(() => enterNode(target), edge.label.trim() ? 760 : 420)
  }

  const totalMedia = nodes.reduce(
    (total, node) => total + (node.blocks || []).filter((b) => MEDIA_KINDS.has(b.kind) && blockHasMedia(b)).length,
    0,
  )
  const stats = [
    { value: nodes.length, label: 'balões' },
    { value: edges.length, label: 'ligações' },
    { value: totalMedia, label: 'mídias' },
  ]

  const mediaCount = totalMedia

  return (
    <div className="preview-overlay">
      <div className="preview-glow preview-glow-a" />
      <div className="preview-glow preview-glow-b" />
      <button type="button" className="preview-close" onClick={onClose} aria-label="Fechar prévia">
        <X size={19} />
      </button>

      <div className="preview-layout">
        <aside className="preview-info">
          <span className="preview-eyebrow"><Sparkles size={13} /> prévia interativa</span>
          <h2>Sinta o fluxo<br />antes de <em>publicar.</em></h2>
          <p>Percorra cada caminho, ouça os áudios e veja as mídias exatamente como seu cliente veria. As escolhas acendem as cores das suas ligações.</p>

          <div className="preview-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{String(stat.value).padStart(2, '0')}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="preview-tip">
            <span className="preview-tip-dot" />
            <div>
              <strong>{brand !== 'flui' ? brand : 'Seu fluxo'} em ação</strong>
              <p>{mediaCount ? 'As mídias aparecem dentro da conversa.' : 'Adicione áudio, foto ou vídeo para enriquecer a prévia.'}</p>
            </div>
          </div>

          <button type="button" className="preview-restart" onClick={restart}>
            <RotateCcw size={15} /> Recomeçar conversa
          </button>
          <span className="preview-footnote">Nada é enviado de verdade. É só um ensaio. ✦</span>
        </aside>

        <div className="phone-wrap">
          <div className="phone">
            <div className="phone-sheen" />
            <div className="phone-screen">
              <div className="phone-statusbar">
                <span>09:41</span>
                <span className="phone-signal"><i /><i /><i /><b /></span>
              </div>

              <header className="chat-header">
                <button type="button" className="chat-header-icon" aria-label="Voltar" onClick={onClose}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <span className="chat-avatar">A<span className="chat-online" /></span>
                <div className="chat-person">
                  <strong>Ana</strong>
                  <small>{brand !== 'flui' ? `da ${brand}` : 'assistente'} · online</small>
                </div>
                <div className="chat-header-actions">
                  <span className="chat-header-dot" />
                  <span className="chat-header-dot" />
                  <span className="chat-header-dot" />
                </div>
              </header>

              <div className="chat-body" ref={chatRef}>
                <div className="chat-day">hoje</div>
                {messages.map((message) => {
                  if (message.kind === 'system') {
                    return (
                      <div className="chat-system" key={message.id}>
                        {message.text || (message.node?.type === 'delay'
                          ? `⏳ ${message.node.delay?.value || 2} ${message.node.delay?.unit || 'horas'} depois`
                          : 'etapa do fluxo')}
                      </div>
                    )
                  }
                  if (message.kind === 'user') {
                    return (
                      <div className="chat-row is-user" key={message.id}>
                        <div className="chat-bubble user-bubble" style={{ '--bubble-color': message.edge?.color || '#8b5cf6' }}>
                          {message.text}
                          <span className="bubble-check">✓✓</span>
                        </div>
                      </div>
                    )
                  }
                  const node = message.node
                  return (
                    <div className={`chat-row ${node.type === 'delay' ? 'is-system' : ''}`} key={message.id}>
                      {node.type === 'delay' ? (
                        <div className="chat-delay">
                          <Clock3 size={13} />
                          {node.delay?.value || 2} {node.delay?.unit || 'horas'} de pausa
                        </div>
                      ) : (
                        <div className="chat-bubble bot-bubble" style={{ '--bubble-color': node.accent }}>
                          {node.type === 'condition' ? (
                            <>
                              <div className="chat-condition-title"><GitBranch size={12} /> {node.title || 'Escolha um caminho'}</div>
                              {node.text && <p><RichText text={node.text} /></p>}
                            </>
                          ) : (
                            <ChatBlocks node={node} />
                          )}
                          <div className="chat-bubble-meta">
                            <TypePill type={node.type} kinds={getBlockKinds(node)} />
                            <span>agora ✓✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {typing && (
                  <div className="chat-row">
                    <div className="chat-typing" aria-label="Digitando">
                      <span /><span /><span />
                    </div>
                  </div>
                )}

                {finished && (
                  <div className="chat-finish">
                    <span>✦</span>
                    <strong>Fim do fluxo</strong>
                    <p>Essa foi uma das histórias possíveis.</p>
                    <button type="button" onClick={restart}><RotateCcw size={13} /> Recomeçar</button>
                  </div>
                )}
              </div>

              <footer className="chat-footer">
                {choices.length > 0 && (
                  <div className="chat-choices">
                    <span className="chat-choices-label">escolha uma resposta</span>
                    {choices.map((edge, index) => (
                      <button
                        type="button"
                        key={edge.id}
                        className="chat-choice"
                        style={{ '--choice-color': edge.color }}
                        onClick={() => choose(edge)}
                        disabled={typing}
                      >
                        <i />
                        <span>{edge.label || (choices.length > 1 ? `Caminho ${index + 1}` : 'Continuar')}</span>
                        <ArrowUpRight size={14} />
                      </button>
                    ))}
                  </div>
                )}
                <div className="chat-input">
                  <span>{typing ? 'digitando…' : choices.length ? 'toque em uma resposta' : finished ? 'conversa encerrada' : 'aguardando…'}</span>
                  <button type="button" className="chat-send" aria-label="Enviar" disabled>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                  </button>
                </div>
              </footer>
            </div>
          </div>
          <div className="phone-shadow" />
        </div>
      </div>
    </div>
  )
}
