const prefix = 'Invariant violated'

export function invariant(condition: boolean, message: string) {
  if (condition) return

  if (process.env.NODE_ENV === 'production') throw new Error(prefix)

  throw new Error(`${prefix}: ${message}`)
}
