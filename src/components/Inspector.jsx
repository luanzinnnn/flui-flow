import React, { useEffect, useRef } from 'react'
import {
  ArrowRight, ArrowUpRight, ChevronRight, Clock3, Copy, GitBranch, Image as ImageIcon,
  Layers, Link2, Mic, Trash2, Type, Video, X,
} from 'lucide-react'
import { EDGE_COLORS, NODE_ACCENTS, NODE_TYPES } from '../data/flowData'
import { getBlockKinds, isMessageNode } from '../lib/content'
import BlockComposer from './BlockComposer'

const NODE_ICON = {
  text: Type,
  audio: Mic,
  image: ImageIcon,
  video: Video,
  condition: GitBranch,
  delay: Clock3,
  start: PlayIcon,
  reference: ArrowUpRight,
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function Section({ title, aside, children }) {
  return (
    <section className="inspector-section">
      <div className="section-head">
        <span>{title}</span>
        {aside}
      </div>
      {children}
    </section>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`switch ${checked ? 'is-on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <i><b /></i>
    </button>
  )
}

function EdgePreview({ edge }) {
  return (
    <div className="edge-preview" style={{ '--edge-color': edge.color }}>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="preview-halo" d="M8 40 C 90 40, 210 40, 292 40" />
        <path
          className="preview-line"
          d="M8 40 C 90 40, 210 40, 292 40"
          strokeDasharray={edge.dashed ? '8 8' : undefined}
        />
        {edge.animated && <path className="preview-flow" d="M8 40 C 90 40, 210 40, 292 40" />}
        <circle cx="8" cy="40" r="4" fill="currentColor" opacity=".55" />
        <circle cx="292" cy="40" r="4" fill="currentColor" />
      </svg>
      <span>{edge.label || 'sem rótulo'}</span>
    </div>
  )
}

export default function Inspector({
  selected, node, edge, sourceNode, targetNode, outEdges, nodes,
  onClose, onPatchNode, onPatchEdge, onDelete, onDuplicate,
  onPatchBlock, onAddTextBlock, onAddAudioBlock, onOpenLibrary,
  onPickBlockMedia, onRemoveBlock, onMoveBlock, onBlockRecorded,
  onSelectEdge, onOpenReference, onError,
}) {
  const scrollRef = useRef(null)
  const selectionKey = selected ? `${selected.type}:${selected.id}` : ''

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [selectionKey])

  if (!selected) return null

  if (selected.type === 'node' && node?.type === 'reference') {
    return (
      <aside className="inspector" key={selectionKey} aria-label="Atalho entre fluxos">
        <div className="inspector-head">
          <span className="inspector-eyebrow"><ArrowUpRight size={12} /> atalho</span>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Fechar painel"><X size={16} /></button>
        </div>
        <div className="inspector-scroll" ref={scrollRef}>
          <div className="inspector-title-block">
            <h2>Uma ponte entre <em>fluxos.</em></h2>
            <p>Este cartão continua o atendimento em outro fluxo. Use o mapa ou a lista de fluxos para voltar.</p>
          </div>

          <Section title="Fluxo de destino">
            <div className="reference-target-card">
              <i style={{ background: node.accent || '#c4b5fd' }} />
              <div>
                <small>{node.targetFlowTitle || 'Outro fluxo'}</small>
                <strong>{node.targetNodeTitle || node.title || 'Caminho de destino'}</strong>
              </div>
            </div>
          </Section>

          <button type="button" className="reference-open-btn" onClick={() => onOpenReference?.(node)}>
            Abrir fluxo de destino <ArrowUpRight size={14} />
          </button>

          {node.note?.trim() && (
            <Section title="Nota interna">
              <p className="field-hint">{node.note}</p>
            </Section>
          )}

          <div className="inspector-actions">
            <button type="button" className="danger-btn" onClick={onDelete}>
              <Trash2 size={14} /> Excluir atalho
            </button>
          </div>
        </div>
      </aside>
    )
  }

  if (selected.type === 'edge' && edge) {
    return (
      <aside className="inspector" key={selectionKey} aria-label="Propriedades da ligação">
        <div className="inspector-head">
          <span className="inspector-eyebrow"><Link2 size={12} /> ligação</span>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Fechar painel"><X size={16} /></button>
        </div>
        <div className="inspector-scroll" ref={scrollRef}>
          <div className="inspector-title-block">
            <h2>Uma conexão com <em>personalidade.</em></h2>
            <p>Cor, rótulo e movimento. A linha também conta parte da história.</p>
          </div>

          <div className="edge-route">
            <span className="route-node">
              <i style={{ background: sourceNode?.accent || '#a78bfa' }} />
              <span>{sourceNode?.title || (sourceNode?.type === 'start' ? 'Início' : 'Balão')}</span>
            </span>
            <ArrowRight size={14} />
            <span className="route-node">
              <i style={{ background: targetNode?.accent || '#67e8f9' }} />
              <span>{targetNode?.title || 'Balão'}</span>
            </span>
          </div>

          <Section title="Rótulo">
            <input
              className="text-input"
              value={edge.label}
              placeholder="Ex.: Sim, quero · 24h depois"
              onChange={(e) => onPatchEdge({ label: e.target.value }, `edge-label:${edge.id}`)}
              maxLength={48}
            />
            <p className="field-hint">Aparece no meio da linha e nas opções da prévia.</p>
          </Section>

          <Section title="Cor da ligação">
            <div className="swatch-grid">
              {EDGE_COLORS.map((color) => (
                <button
                  type="button"
                  key={color.value}
                  className={`color-swatch ${edge.color.toLowerCase() === color.value.toLowerCase() ? 'is-active' : ''}`}
                  style={{ '--swatch': color.value }}
                  onClick={() => onPatchEdge({ color: color.value })}
                  aria-label={color.name}
                  title={color.name}
                >
                  <span />
                </button>
              ))}
              <label className="custom-color" title="Cor personalizada">
                <input type="color" value={edge.color} onChange={(e) => onPatchEdge({ color: e.target.value })} />
                <span>+</span>
              </label>
            </div>
          </Section>

          <Section title="Estilo">
            <div className="switch-stack">
              <Switch checked={edge.animated} onChange={(v) => onPatchEdge({ animated: v })} label="Fluxo animado" />
              <Switch checked={edge.dashed} onChange={(v) => onPatchEdge({ dashed: v })} label="Linha tracejada" />
            </div>
          </Section>

          <Section title="Prévia">
            <EdgePreview edge={edge} />
          </Section>

          <div className="inspector-actions">
            <button type="button" className="danger-btn" onClick={onDelete}>
              <Trash2 size={14} /> Excluir ligação
            </button>
          </div>
          <p className="undo-hint">Você pode desfazer com <kbd>⌘</kbd><kbd>Z</kbd>.</p>
        </div>
      </aside>
    )
  }

  if (!node) return null
  const isStart = node.type === 'start'
  const isCondition = node.type === 'condition'
  const isDelay = node.type === 'delay'
  const message = isMessageNode(node)
  const blocks = Array.isArray(node.blocks) ? node.blocks : []
  const kinds = getBlockKinds(node)
  const Icon = message
    ? (kinds.length > 1 ? Layers : (NODE_ICON[kinds[0]] || NODE_ICON[node.type] || Type))
    : (NODE_ICON[node.type] || Type)
  const eyebrow = message
    ? (kinds.length > 1 ? 'conteúdo' : (NODE_TYPES[kinds[0] || node.type]?.label || 'balão'))
    : (NODE_TYPES[node.type]?.label || 'balão')

  return (
    <aside className="inspector" key={selectionKey} aria-label="Propriedades do balão">
      <div className="inspector-head">
        <span className="inspector-eyebrow"><Icon size={12} /> {eyebrow}</span>
        <button type="button" className="panel-close" onClick={onClose} aria-label="Fechar painel"><X size={16} /></button>
      </div>
      <div className="inspector-scroll" ref={scrollRef}>
        <div className="inspector-title-block">
          <h2>
            {isStart ? <>O começo de <em>tudo.</em></> : isCondition ? <>Um caminho, <em>duas histórias.</em></> : isDelay ? <>O tempo certo, <em>sempre.</em></> : <>Dê vida ao <em>seu balão.</em></>}
          </h2>
          <p>
            {isStart
              ? 'Todo fluxo parte daqui. Arraste a alça para ligar a primeira mensagem.'
              : isCondition
                ? 'Cada ligação que sai deste balão é uma resposta possível.'
                : isDelay
                  ? 'Uma pausa estratégica antes da próxima mensagem.'
                  : 'Combine texto, foto, vídeo e áudio na ordem que fizer sentido.'}
          </p>
        </div>

        {!isStart && (
          <>
            <Section title="Identificação">
              <label className="field-label" htmlFor={`node-title-${node.id}`}>
                {isCondition ? 'Nome da condição' : isDelay ? 'Nome da espera' : 'Título do balão'}
              </label>
              <input
                id={`node-title-${node.id}`}
                className="text-input"
                value={node.title}
                placeholder="Ex.: Boas-vindas"
                onChange={(e) => onPatchNode({ title: e.target.value }, `node-title:${node.id}`)}
                maxLength={64}
              />
            </Section>

            {isDelay && (
              <Section title="Tempo de espera">
                <div className="delay-input-row">
                  <input
                    className="text-input"
                    type="number"
                    min="1"
                    max="999"
                    value={node.delay?.value ?? 2}
                    onChange={(e) => onPatchNode({ delay: { ...node.delay, value: Math.max(1, Number(e.target.value) || 1) } })}
                  />
                  <select
                    className="select-input"
                    value={node.delay?.unit || 'horas'}
                    onChange={(e) => onPatchNode({ delay: { ...node.delay, unit: e.target.value } })}
                  >
                    <option value="minutos">minutos</option>
                    <option value="horas">horas</option>
                    <option value="dias">dias</option>
                  </select>
                </div>
                <p className="field-hint">A prévia mostra a pausa e segue para o próximo balão.</p>
              </Section>
            )}

            {isCondition && (
              <Section title="Conteúdo">
                <label className="field-label" htmlFor={`node-text-${node.id}`}>Detalhe da condição</label>
                <textarea
                  id={`node-text-${node.id}`}
                  className="text-area"
                  value={node.text || ''}
                  placeholder="Explique o critério deste caminho…"
                  rows={4}
                  onChange={(e) => onPatchNode({ text: e.target.value }, `node-text:${node.id}`)}
                  maxLength={900}
                />
                <div className="field-meta">
                  <span>Use **palavra** para negrito.</span>
                  <span>{(node.text || '').length}/900</span>
                </div>
              </Section>
            )}

            {message && (
              <Section
                title="Conteúdo do balão"
                aside={<span className="section-count">{blocks.length}</span>}
              >
                <BlockComposer
                  node={node}
                  blocks={blocks}
                  onPatchBlock={onPatchBlock}
                  onAddTextBlock={onAddTextBlock}
                  onAddAudioBlock={onAddAudioBlock}
                  onOpenLibrary={onOpenLibrary}
                  onPickBlockMedia={onPickBlockMedia}
                  onRemoveBlock={onRemoveBlock}
                  onMoveBlock={onMoveBlock}
                  onRecorded={onBlockRecorded}
                  onError={onError}
                />
              </Section>
            )}

            <Section title="Nota interna" aside={<span className="section-count">não enviada</span>}>
              <textarea
                id={`node-note-${node.id}`}
                className="text-area note-area"
                value={node.note || ''}
                placeholder="Contexto para você e para o Copiloto. Não aparece para o cliente."
                rows={5}
                onChange={(e) => onPatchNode({ note: e.target.value }, `node-note:${node.id}`)}
                maxLength={8000}
              />
              <p className="field-hint">Fica fora da mensagem: serve para variações, instruções da equipe e pendências de revisão.</p>
            </Section>

            <Section title="Aparência">
              <div className="swatch-grid">
                {NODE_ACCENTS.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`color-swatch ${node.accent.toLowerCase() === color.toLowerCase() ? 'is-active' : ''}`}
                    style={{ '--swatch': color }}
                    onClick={() => onPatchNode({ accent: color })}
                    aria-label={`Cor ${color}`}
                  >
                    <span />
                  </button>
                ))}
                <label className="custom-color" title="Cor personalizada">
                  <input type="color" value={node.accent} onChange={(e) => onPatchNode({ accent: e.target.value })} />
                  <span>+</span>
                </label>
              </div>
            </Section>

            <Section
              title="Saídas"
              aside={<span className="section-count">{outEdges.length}</span>}
            >
              {outEdges.length === 0 ? (
                <div className="connections-empty">
                  <span className="connections-empty-line" />
                  Arraste a alça à direita do balão para conectar o próximo passo.
                </div>
              ) : (
                <div className="connections-list">
                  {outEdges.map((out) => {
                    const target = nodes.find((n) => n.id === out.to)
                    return (
                      <button type="button" className="connection-row" key={out.id} onClick={() => onSelectEdge(out.id)}>
                        <i style={{ background: out.color }} />
                        <span>
                          <strong>{out.label || 'Sem rótulo'}</strong>
                          <small>para {target?.title || (target?.type === 'start' ? 'Início' : 'balão')}</small>
                        </span>
                        <ChevronRight size={14} />
                      </button>
                    )
                  })}
                </div>
              )}
            </Section>
          </>
        )}

        {isStart && (
          <Section title="Saídas" aside={<span className="section-count">{outEdges.length}</span>}>
            {outEdges.length === 0 ? (
              <div className="connections-empty">
                <span className="connections-empty-line" />
                Arraste a alça à direita para criar a primeira ligação.
              </div>
            ) : (
              <div className="connections-list">
                {outEdges.map((out) => {
                  const target = nodes.find((n) => n.id === out.to)
                  return (
                    <button type="button" className="connection-row" key={out.id} onClick={() => onSelectEdge(out.id)}>
                      <i style={{ background: out.color }} />
                      <span>
                        <strong>{out.label || 'Primeira mensagem'}</strong>
                        <small>para {target?.title || 'balão'}</small>
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  )
                })}
              </div>
            )}
          </Section>
        )}

        {!isStart && (
          <div className="inspector-actions">
            <button type="button" className="secondary-btn" onClick={onDuplicate}>
              <Copy size={14} /> Duplicar
            </button>
            <button type="button" className="danger-btn" onClick={onDelete}>
              <Trash2 size={14} /> Excluir
            </button>
          </div>
        )}
        <p className="undo-hint">Tudo salvo automaticamente. Desfaça com <kbd>⌘</kbd><kbd>Z</kbd>.</p>
      </div>
    </aside>
  )
}
