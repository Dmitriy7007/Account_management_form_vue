export function parseLabels(raw: string) {
  if (!raw) return []
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}
