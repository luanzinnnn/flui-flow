import React, { memo, useMemo } from 'react'
import { getBezier, getConnectionPreview } from '../lib/geometry'

const safeId = (value) => String(value).replace(/[^a-zA-Z0-9]/g, '')

function EdgeLayer({
  nodes, edges, sizes, selectedEdgeId, selectedNodeId, connecting, onSelectEdge, onNavigateEdge, onHoverEdge, overview = false, showLabels = true,
}) {
  const boxes = useMemo(() => {
    const map = {}
    for (const node of nodes) {
      const measured = sizes[node.id]
      map[node.id] = {
        x: node.x,
        y: node.y,
        w: measured?.w || node.w || 304,
        h: measured?.h || 180,
      }
    }
    return map
  }, [nodes, sizes])

  const colors = useMemo(() => [...new Set(edges.map((e) => e.color))], [edges])

  const source = connecting ? boxes[connecting.from] : null
  const previewPath = source && connecting
    ? getConnectionPreview(source, { x: connecting.x, y: connecting.y })
    : null

  const heavy = nodes.length > 30
  const renderLabels = Boolean(selectedEdgeId) || (!overview && (!heavy ? showLabels : Boolean(selectedNodeId)))
  return (
    <>
      <svg className={`edge-layer ${overview ? 'is-overview' : ''}`} width="12000" height="8000" aria-hidden="true">
        <defs>
          {colors.map((color) => (
            <marker
              key={color}
              id={`arrow-${safeId(color)}`}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
          <filter id="edge-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {edges.map((edge) => {
          const from = boxes[edge.from]
          const to = boxes[edge.to]
          if (!from || !to) return null
          const geo = getBezier(from, to)
          const selected = edge.id === selectedEdgeId
          const related = Boolean(selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId))
          return (
            <g key={edge.id} className={`edge ${selected ? 'is-selected' : ''} ${related ? 'is-related' : ''} ${edge.weak ? 'is-weak' : ''}`}>
              {!overview && !heavy && <path className="edge-glow" d={geo.path} stroke={edge.color} />}
              <path
                className="edge-path"
                d={geo.path}
                stroke={edge.color}
                strokeDasharray={edge.dashed ? '7 7' : undefined}
                markerEnd={overview || heavy ? undefined : `url(#arrow-${safeId(edge.color)})`}
              />
              {!overview && !heavy && edge.animated && (
                <path
                  className="edge-flow"
                  d={geo.path}
                  stroke={edge.color}
                  style={{ animationDelay: `${(edge.id.charCodeAt(edge.id.length - 1) % 5) * 0.18}s` }}
                />
              )}
              <path
                className="edge-hit"
                d={geo.path}
                title="Clique para abrir o balão de destino"
                onPointerDown={(e) => e.stopPropagation()}
                onPointerEnter={(e) => onHoverEdge?.(edge, e)}
                onPointerLeave={() => onHoverEdge?.(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  if (e.altKey || e.shiftKey) onSelectEdge(edge.id)
                  else onNavigateEdge?.(edge)
                }}
              />
            </g>
          )
        })}

        {previewPath && (
          <g className="edge-preview">
            <path d={previewPath} className="preview-path" />
            <circle cx={connecting.x} cy={connecting.y} r="5" className="preview-dot" />
          </g>
        )}
      </svg>

      {renderLabels && <div className="edge-label-layer">
        {edges.map((edge) => {
          const from = boxes[edge.from]
          const to = boxes[edge.to]
          if (!from || !to) return null
          const geo = getBezier(from, to)
          const selected = edge.id === selectedEdgeId
          const related = Boolean(selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId))
          const shouldShow = selected || (!overview && (!heavy ? showLabels : related))
          if (!shouldShow) return null
          if (edge.hideLabel && !selected) return null
          if (!edge.label && !selected) return null
          return (
            <button
              key={edge.id}
              type="button"
              className={`edge-label ${selected ? 'is-selected' : ''} ${!edge.label ? 'is-empty' : ''}`}
              style={{ left: geo.mx, top: geo.my, '--edge-color': edge.color }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onSelectEdge(edge.id) }}
            >
              <i style={{ background: edge.color }} />
              {edge.label || 'adicionar rótulo'}
            </button>
          )
        })}
      </div>}
    </>
  )
}

export default memo(EdgeLayer)
