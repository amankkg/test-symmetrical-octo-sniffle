import * as breakpoints from './default-breakpoints'

type CustomQueryOption = readonly [string, JSX.Element]

function useResponsive(
  options: Array<JSX.Element | CustomQueryOption>,
): JSX.Element {
  // TODO: add more type-level so it looks very elite
  // TODO: refactor to support more overloads, now there are too many IF statements
  // TODO: support different types of CSS Media Query (object, React-like JS object)
  // TODO: add window resize listener?
  if (options.length > 4) {
    const mq = Array.isArray(options[4])
      ? options[4][0]
      : breakpoints.viewport12

    if (window.matchMedia(mq).matches)
      return Array.isArray(options[4]) ? options[4][1] : options[4]
  }

  if (options.length > 3) {
    const mq = Array.isArray(options[3]) ? options[3][0] : breakpoints.viewport9

    if (window.matchMedia(mq).matches)
      return Array.isArray(options[3]) ? options[3][1] : options[3]
  }

  if (options.length > 2) {
    const mq = Array.isArray(options[2]) ? options[2][0] : breakpoints.viewport7

    if (window.matchMedia(mq).matches)
      return Array.isArray(options[2]) ? options[2][1] : options[2]
  }

  if (options.length > 1) {
    const mq = Array.isArray(options[1]) ? options[1][0] : breakpoints.viewport4

    if (window.matchMedia(mq).matches)
      return Array.isArray(options[1]) ? options[1][1] : options[1]
  }

  // TODO: disallow first entry to be an array?
  return Array.isArray(options[0]) ? options[0][1] : options[0]
}

export {useResponsive}
