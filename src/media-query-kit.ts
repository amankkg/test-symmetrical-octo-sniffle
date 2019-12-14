export function stringifyMediaQuery(
  raw: string | string[] | {[key: string]: string},
): string {
  if (typeof raw === 'string') return raw

  if (Array.isArray(raw)) return raw.join(', ')

  return Object.entries(raw)
    .map(([key, value]) => `(${toKebabCase(key)}: ${value})`)
    .join(', ')
}

function toKebabCase(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
