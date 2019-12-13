export function stringifyMediaQuery(
  rawBreakpoint: string | {[key: string]: string},
): string {
  // TODO: support different types of CSS Media Query (object, React-like JS object)
  return rawBreakpoint.toString()
}
