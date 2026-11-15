import { useCallback, useRef, useState } from 'react'

export function useFlowHistory(initialDoc) {
  const [doc, setDocState] = useState(initialDoc)
  const docRef = useRef(initialDoc)
  const pastRef = useRef([])
  const futureRef = useRef([])
  const lastKeyRef = useRef({ key: null, at: 0 })
  const [, setVersion] = useState(0)

  const bump = useCallback(() => setVersion((v) => v + 1), [])

  const pushPast = useCallback((snapshot) => {
    pastRef.current.push(snapshot)
    if (pastRef.current.length > 120) pastRef.current.shift()
    futureRef.current = []
    lastKeyRef.current = { key: null, at: 0 }
    bump()
  }, [bump])

  const apply = useCallback((updater, options = {}) => {
    const prev = docRef.current
    const next = typeof updater === 'function' ? updater(prev) : updater
    if (!next || next === prev) return false
    const useHistory = options.history !== false
    if (useHistory) {
      const key = options.key
      const now = Date.now()
      const coalesce = Boolean(key) && lastKeyRef.current.key === key && now - lastKeyRef.current.at < 850
      if (!coalesce) pushPast(prev)
      else {
        futureRef.current = []
        bump()
      }
      lastKeyRef.current = { key: key || null, at: now }
    }
    docRef.current = next
    setDocState(next)
    return true
  }, [bump, pushPast])

  const pushSnapshot = useCallback(() => {
    pushPast(docRef.current)
  }, [pushPast])

  const undo = useCallback(() => {
    if (!pastRef.current.length) return
    const previous = pastRef.current.pop()
    futureRef.current.push(docRef.current)
    docRef.current = previous
    lastKeyRef.current = { key: null, at: 0 }
    setDocState(previous)
    bump()
  }, [bump])

  const redo = useCallback(() => {
    if (!futureRef.current.length) return
    const next = futureRef.current.pop()
    pastRef.current.push(docRef.current)
    docRef.current = next
    lastKeyRef.current = { key: null, at: 0 }
    setDocState(next)
    bump()
  }, [bump])

  return {
    doc,
    docRef,
    apply,
    pushSnapshot,
    undo,
    redo,
    canUndo: pastRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
  }
}
