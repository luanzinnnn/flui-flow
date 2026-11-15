const DOC_KEY = 'flui:doc:v2'
const VIEW_KEY = 'flui:view:v2'
const PREFS_KEY = 'flui:prefs:v1'

export function loadDoc() {
  try {
    const raw = localStorage.getItem(DOC_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.nodes?.length || !Array.isArray(parsed.edges)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveDoc(doc) {
  try {
    localStorage.setItem(DOC_KEY, JSON.stringify(doc))
    return true
  } catch {
    return false
  }
}

export function loadView() {
  try {
    const raw = localStorage.getItem(VIEW_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveView(view) {
  try {
    localStorage.setItem(VIEW_KEY, JSON.stringify(view))
  } catch {
    /* ignore */
  }
}

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

export function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
