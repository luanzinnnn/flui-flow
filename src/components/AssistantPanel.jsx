import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle, Check, ChevronDown, ChevronUp, Copy, ExternalLink, Eye, EyeOff,
  GitBranch, KeyRound, Loader2, Lock, MessageSquare, Send, Sparkles, Trash2, Wand2, X,
} from 'lucide-react'
import { buildAssistantSystemPrompt, buildFlowContext } from '../lib/assistantContext'

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-chat'
const SESSION_KEY = 'flui:deepseek:key'
const MAX_HISTORY = 12

const nowId = () => `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

function readKey() {
  try { return sessionStorage.getItem(SESSION_KEY) || '' } catch { return '' }
}

function writeKey(key) {
  try {
    if (key) sessionStorage.setItem(SESSION_KEY, key)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch { /* ignore */ }
}

function InlineMarkdown({ text }) {
  const chunks = String(text || '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return chunks.map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) return <strong key={i}>{chunk.slice(2, -2)}</strong>
    if (chunk.startsWith('`') && chunk.endsWith('`')) return <code key={i}>{chunk.slice(1, -1)}</code>
    return <React.Fragment key={i}>{chunk}</React.Fragment>
  })
}

function MarkdownLite({ content }) {
  const parts = String(content || '').split(/(```[\s\S]*?```)/g)
  return (
    <div className="assistant-markdown">
      {parts.map((part, partIndex) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).replace(/^[a-zA-Z0-9_-]+\n/, '')
          return <pre key={partIndex}><code>{code.trim()}</code></pre>
        }
        const lines = part.split('\n')
        const nodes = []
        let list = null
        lines.forEach((line, lineIndex) => {
          const bullet = line.match(/^\s*[-*]\s+(.*)$/)
          const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)
          if (bullet || numbered) {
            if (!list) {
              list = { ordered: Boolean(numbered), items: [] }
              nodes.push({ type: 'list', list })
            }
            list.items.push((bullet || numbered)[1])
            return
          }
          list = null
          if (!line.trim()) {
            nodes.push({ type: 'space' })
            return
          }
          if (/^#{1,4}\s/.test(line)) {
            nodes.push({ type: 'heading', text: line.replace(/^#{1,4}\s*/, '') })
            return
          }
          nodes.push({ type: 'paragraph', text: line })
        })
        return nodes.map((node, i) => {
          const key = `${partIndex}-${i}`
          if (node.type === 'space') return <span className="md-space" key={key} />
          if (node.type === 'heading') return <h4 key={key}><InlineMarkdown text={node.text} /></h4>
          if (node.type === 'list') {
            const ListTag = node.list.ordered ? 'ol' : 'ul'
            return (
              <ListTag key={key}>
                {node.list.items.map((item, ii) => <li key={ii}><InlineMarkdown text={item} /></li>)}
              </ListTag>
            )
          }
          return <p key={key}><InlineMarkdown text={node.text} /></p>
        })
      })}
    </div>
  )
}

function CopyButton({ text, label = 'Copiar' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* ignore */ }
  }
  return (
    <button type="button" className="assistant-copy" onClick={copy}>
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'copiado' : label}
    </button>
  )
}

function apiErrorMessage(status, payload) {
  const detail = payload?.error?.message || payload?.message
  if (status === 401 || status === 403) {
    return { message: 'A chave da DeepSeek não foi aceita. Confira se copiou a chave inteira e se ela está ativa.', key: true }
  }
  if (status === 402) {
    return { message: 'A API da DeepSeek informou que a conta está sem saldo/créditos. Adicione créditos na plataforma e tente de novo.', key: true }
  }
  if (status === 429) {
    return { message: 'Muitas requisições em pouco tempo. Espere alguns segundos e tente novamente.', key: false }
  }
  if (status === 400) {
    return { message: detail || 'A DeepSeek não aceitou a requisição. Tente reformular a pergunta.', key: false }
  }
  return { message: detail || `A DeepSeek respondeu com erro ${status}. Tente novamente em instantes.`, key: false }
}

function KeySetup({ hasKey, keyDraft, setKeyDraft, showKey, setShowKey, onConnect, onCancel, onDisconnect, error }) {
  return (
    <div className="assistant-key-setup">
      <div className="assistant-key-icon"><Lock size={19} /></div>
      <span className="assistant-eyebrow">conexão</span>
      <h3>Conecte sua chave DeepSeek</h3>
      <p>O copiloto usa a API oficial da DeepSeek para ler o fluxo e ajudar nas respostas.</p>
      <form onSubmit={(e) => { e.preventDefault(); onConnect() }}>
        <div className={`assistant-key-field ${error ? 'has-error' : ''}`}>
          <KeyRound size={14} />
          <input
            type={showKey ? 'text' : 'password'}
            value={keyDraft}
            onChange={(e) => setKeyDraft(e.target.value)}
            placeholder={hasKey ? 'Cole uma nova chave para trocar' : 'sk-…'}
            autoComplete="off"
            spellCheck="false"
            aria-label="Chave da API DeepSeek"
          />
          <button type="button" className="key-eye" onClick={() => setShowKey((v) => !v)} aria-label={showKey ? 'Ocultar chave' : 'Mostrar chave'}>
            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        {error && <p className="assistant-key-error">{error}</p>}
        <button type="submit" className="assistant-connect-btn" disabled={!keyDraft.trim()}>
          <KeyRound size={14} /> {hasKey ? 'Salvar nova chave' : 'Conectar DeepSeek'}
        </button>
      </form>
      <div className="assistant-key-links">
        <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noreferrer">
          Criar uma chave na DeepSeek <ExternalLink size={11} />
        </a>
        {hasKey && (
          <>
            <span>·</span>
            <button type="button" onClick={onCancel}>voltar ao chat</button>
            <span>·</span>
            <button type="button" className="danger" onClick={onDisconnect}>desconectar</button>
          </>
        )}
      </div>
      <div className="assistant-security-note">
        <Lock size={12} />
        <span>Sua chave fica apenas na memória desta aba (sessionStorage) e é enviada direto para a API da DeepSeek. O fluxo e as mensagens da conversa também são enviados quando você pede uma resposta. O flui não guarda sua chave em servidor.</span>
      </div>
    </div>
  )
}

export default function AssistantPanel({
  open, onClose, doc, selected, selectedNode, selectedEdge,
}) {
  const [apiKey, setApiKey] = useState(readKey)
  const [editingKey, setEditingKey] = useState(false)
  const [keyDraft, setKeyDraft] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [keyError, setKeyError] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showContext, setShowContext] = useState(false)
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const sendingRef = useRef(false)

  const contextInfo = useMemo(() => buildFlowContext(doc, selected), [doc, selected])
  const systemPrompt = useMemo(() => buildAssistantSystemPrompt(doc, selected), [doc, selected])

  const skills = useMemo(() => {
    if (selectedEdge) return ['Explique esta ligação', 'Sugira um rótulo melhor', 'O que enviar depois dela?']
    if (selectedNode?.type === 'condition') return ['Quais respostas criar?', 'Melhore esta condição', 'Sugira rótulos para os caminhos']
    if (selectedNode?.type === 'delay') return ['O que enviar depois da espera?', 'Esse tempo faz sentido?', 'Revisar o fluxo']
    if (selectedNode) return ['O que responder aqui?', 'Melhore esta mensagem', 'Sugira o próximo balão']
    return ['Revisar meu fluxo', 'Sugerir próximos balões', 'Onde o cliente pode travar?']
  }, [selectedNode, selectedEdge])

  useEffect(() => {
    if (!open) return undefined
    const timer = setTimeout(() => {
      if (apiKey && !editingKey && window.innerWidth > 900) inputRef.current?.focus()
    }, 220)
    return () => clearTimeout(timer)
  }, [open, apiKey, editingKey])

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, error, open])

  useEffect(() => {
    if (!open) return
    setError(null)
  }, [open])

  const connectKey = () => {
    const key = keyDraft.trim()
    if (!key) {
      setKeyError('Cole sua chave da API DeepSeek para continuar.')
      return
    }
    writeKey(key)
    setApiKey(key)
    setEditingKey(false)
    setKeyDraft('')
    setKeyError('')
    setError(null)
  }

  const disconnectKey = () => {
    writeKey('')
    setApiKey('')
    setKeyDraft('')
    setEditingKey(true)
    setKeyError('')
    setError(null)
    setShowKey(false)
  }

  const send = async (explicitText) => {
    const prompt = (explicitText ?? input).trim()
    if (!prompt || loading || sendingRef.current) return
    if (!apiKey) {
      setEditingKey(true)
      setKeyError('Conecte sua chave DeepSeek para conversar com o copiloto.')
      return
    }
    sendingRef.current = true
    setError(null)
    setKeyError('')
    const userMessage = { id: nowId(), role: 'user', content: prompt }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    try {
      const response = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...nextMessages
              .filter((message) => message.role === 'user' || message.role === 'assistant')
              .slice(-MAX_HISTORY)
              .map((message) => ({ role: message.role, content: message.content })),
          ],
          temperature: 0.65,
          max_tokens: 900,
          stream: false,
        }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        setError(apiErrorMessage(response.status, payload))
        return
      }
      const content = payload?.choices?.[0]?.message?.content?.trim()
      if (!content) {
        setError({ message: 'A DeepSeek respondeu vazia. Tente reformular a pergunta.', key: false })
        return
      }
      setMessages((current) => [...current, { id: nowId(), role: 'assistant', content }])
    } catch {
      setError({ message: 'Não consegui falar com a API da DeepSeek. Verifique sua internet e tente novamente.', key: false })
    } finally {
      sendingRef.current = false
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const clearConversation = () => {
    if (loading) return
    setMessages([])
    setError(null)
  }

  const showSetup = !apiKey || editingKey
  const hasMessages = messages.length > 0

  return (
    <aside
      className={`assistant-panel ${open ? 'is-open' : ''}`}
      aria-label="Copiloto de fluxo DeepSeek"
      aria-hidden={!open}
    >
      <div className="assistant-head">
        <div className="assistant-brand">
          <span className="assistant-orb"><Sparkles size={16} /></span>
          <div>
            <span className="assistant-eyebrow">copiloto · deepseek</span>
            <h2>Pergunte ao fluxo</h2>
          </div>
        </div>
        <div className="assistant-head-actions">
          <span className={`assistant-connection ${apiKey ? 'is-on' : ''}`} title={apiKey ? 'Chave configurada nesta aba' : 'Sem chave configurada'}>
            <i /> {apiKey ? 'chave' : 'off'}
          </span>
          <button type="button" className="assistant-icon-btn" onClick={() => setEditingKey((v) => !v)} aria-label="Configurar chave DeepSeek" title="Configurar chave">
            <KeyRound size={14} />
          </button>
          {hasMessages && !showSetup && (
            <button type="button" className="assistant-icon-btn" onClick={clearConversation} aria-label="Limpar conversa" title="Limpar conversa">
              <Trash2 size={14} />
            </button>
          )}
          <button type="button" className="assistant-icon-btn close" onClick={onClose} aria-label="Fechar copiloto">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="assistant-context">
        <div className="assistant-context-top">
          <span className="assistant-read-pill"><GitBranch size={11} /> {contextInfo.nodeCount} balões · {contextInfo.edgeCount} ligações</span>
          <span className="assistant-focus">foco: <strong>{contextInfo.focusLabel}</strong></span>
          <button type="button" className="context-toggle" onClick={() => setShowContext((v) => !v)}>
            {showContext ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {showContext ? 'ocultar' : 'ver contexto'}
          </button>
        </div>
        {showContext && (
          <pre className="assistant-context-pre" aria-label="Contexto que será enviado à DeepSeek">
            {contextInfo.text}
          </pre>
        )}
      </div>

      {showSetup ? (
        <div className="assistant-setup-scroll">
          <KeySetup
            hasKey={Boolean(apiKey)}
            keyDraft={keyDraft}
            setKeyDraft={setKeyDraft}
            showKey={showKey}
            setShowKey={setShowKey}
            onConnect={connectKey}
            onCancel={() => { setEditingKey(false); setKeyDraft(''); setKeyError('') }}
            onDisconnect={disconnectKey}
            error={keyError}
          />
          <div className="assistant-read-card">
            <span className="assistant-eyebrow"><Sparkles size={11} /> contexto pronto</span>
            <strong>{doc?.title?.trim() || 'Fluxo sem título'}</strong>
            <p>O copiloto já consegue ler {contextInfo.nodeCount} balões e {contextInfo.edgeCount} ligações, incluindo as mensagens, caminhos e o balão em foco. A chave só libera a conversa.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="assistant-skills">
            <span className="assistant-skills-label"><Wand2 size={11} /> skills do copiloto</span>
            <div className="assistant-skill-chips">
              {skills.map((skill) => (
                <button type="button" key={skill} onClick={() => send(skill)} disabled={loading}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="assistant-messages" ref={messagesRef}>
            {!hasMessages && (
              <div className="assistant-welcome">
                <span className="assistant-welcome-icon"><Sparkles size={19} /></span>
                <span className="assistant-eyebrow">pronto para ajudar</span>
                <h3>Estou com o seu fluxo inteiro na mão.</h3>
                <p>Selecione um balão para eu focar nele, ou escolha uma skill acima. Posso sugerir respostas, reescrever mensagens, explicar caminhos e apontar onde o fluxo pode travar.</p>
                <div className="assistant-welcome-note">
                  <MessageSquare size={12} /> Usa a API da DeepSeek com a sua chave.
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div className={`assistant-msg ${message.role}`} key={message.id}>
                {message.role === 'assistant' && (
                  <div className="assistant-msg-head">
                    <span className="assistant-msg-avatar"><Sparkles size={11} /></span>
                    <span>Copiloto</span>
                    <CopyButton text={message.content} />
                  </div>
                )}
                <div className={`assistant-bubble ${message.role}`}>
                  {message.role === 'assistant'
                    ? <MarkdownLite content={message.content} />
                    : message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="assistant-msg assistant">
                <div className="assistant-msg-head">
                  <span className="assistant-msg-avatar"><Sparkles size={11} /></span>
                  <span>Copiloto</span>
                  <span className="assistant-thinking-label">lendo o fluxo…</span>
                </div>
                <div className="assistant-typing"><i /><i /><i /></div>
              </div>
            )}

            {error && (
              <div className="assistant-error" role="alert">
                <AlertTriangle size={15} />
                <div>
                  <strong>Não deu para concluir</strong>
                  <p>{error.message}</p>
                  {error.key && (
                    <button type="button" onClick={() => { setEditingKey(true); setKeyError(error.message) }}>
                      Ajustar chave DeepSeek
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="assistant-composer">
            <div className="assistant-input-wrap">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                placeholder={selectedNode ? `Pergunte sobre “${contextInfo.focusLabel}”…` : 'Pergunte sobre o fluxo…'}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(112, Math.max(38, e.target.scrollHeight))}px`
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="Mensagem para o copiloto"
              />
              <button type="button" className="assistant-send" onClick={() => send()} disabled={!input.trim() || loading} aria-label="Enviar pergunta">
                {loading ? <Loader2 size={16} className="spin" /> : <Send size={15} />}
              </button>
            </div>
            <div className="assistant-input-foot">
              <span>Enter envia · Shift + Enter quebra linha</span>
              <span>a IA pode errar; confira antes de usar.</span>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
