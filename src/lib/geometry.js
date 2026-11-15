export function getBezier(source, target) {
  const sx = source.x + source.w
  const sy = source.y + source.h / 2
  const tx = target.x - 6
  const ty = target.y + target.h / 2
  const dx = Math.max(84, Math.abs(tx - sx) * 0.48)
  const c1x = sx + dx
  const c1y = sy
  const c2x = tx - dx
  const c2y = ty
  const path = `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`
  const mx = 0.125 * sx + 0.375 * c1x + 0.375 * c2x + 0.125 * tx
  const my = 0.125 * sy + 0.375 * c1y + 0.375 * c2y + 0.125 * ty
  return { sx, sy, tx, ty, path, mx, my }
}

export function getConnectionPreview(source, point) {
  const sx = source.x + source.w
  const sy = source.y + source.h / 2
  const tx = point.x
  const ty = point.y
  const dx = Math.max(70, Math.abs(tx - sx) * 0.5)
  return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
}

export function pointInNode(node, x, y) {
  return x >= node.x && x <= node.x + node.w && y >= node.y && y <= node.y + node.h
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function getFlowBounds(nodes, sizes, padding = 120) {
  if (!nodes.length) return { minX: -400, minY: -300, maxX: 400, maxY: 300, width: 800, height: 600 }
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const n of nodes) {
    const h = sizes[n.id]?.h || 180
    minX = Math.min(minX, n.x)
    minY = Math.min(minY, n.y)
    maxX = Math.max(maxX, n.x + n.w)
    maxY = Math.max(maxY, n.y + h)
  }
  return {
    minX: minX - padding,
    minY: minY - padding,
    maxX: maxX + padding,
    maxY: maxY + padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  }
}
