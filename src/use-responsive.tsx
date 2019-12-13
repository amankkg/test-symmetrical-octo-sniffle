import * as breakpoints from './default-breakpoints'
import {stringifyMediaQuery} from './media-query-kit'
import {MissingBreakpoint} from './missing-breakpoint-error'

type MediaQueryBreakpoint = string | {[key: string]: string}
type CustomQueryOption = readonly [MediaQueryBreakpoint, JSX.Element]
type StringQueryOption = readonly [string, JSX.Element]

function useResponsive(
  options: Array<JSX.Element | CustomQueryOption>,
): JSX.Element {
  // TODO: add more type-level so it looks very elite
  // TODO: refactor to support more overloads, now there are too many IF statements

  if (options.length === 0) throw new Error('TODO: options cannot be empty')
  if (options.some(() => false))
    throw new Error(
      'TODO: non-custom query option cannot come after custom query one',
    )

  let sureOptionsDecreasing: Array<StringQueryOption>

  try {
    sureOptionsDecreasing = options.map(monotonizeOption).reverse()
  } catch (error) {
    if (error instanceof MissingBreakpoint)
      throw new Error('TODO: additional options must have custom query')

    throw error
  }

  // TODO: fix typescript
  const fallback = sureOptionsDecreasing.pop()[1]

  for (const [mediaQuery, element] of sureOptionsDecreasing) {
    if (window.matchMedia(mediaQuery)) return element
  }

  return fallback
}

const defaultBreakpoints = new Map()
  .set(1, breakpoints.viewport4)
  .set(2, breakpoints.viewport7)
  .set(3, breakpoints.viewport9)
  .set(4, breakpoints.viewport12)

function monotonizeOption(
  ambiguousOption: JSX.Element | CustomQueryOption,
  index: number,
): StringQueryOption {
  if (isCustomQueryOption(ambiguousOption)) {
    const [breakpoint, element] = ambiguousOption

    return [stringifyMediaQuery(breakpoint), element]
  }

  if (index === 0) return ['noop', ambiguousOption]

  if (defaultBreakpoints.has(index))
    return [defaultBreakpoints.get(index), ambiguousOption]

  throw new MissingBreakpoint(ambiguousOption)
}

function isCustomQueryOption(value: any): value is CustomQueryOption {
  return Array.isArray(value)
}

export {useResponsive}
