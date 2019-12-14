import * as breakpoints from './default-breakpoints'
import {stringifyMediaQuery} from './media-query-kit'

type MediaQuery = string | string[] | {[key: string]: string}
type CustomOption<T> = readonly [MediaQuery, T]
type StringQueryOption<T> = readonly [string, T]
type OptionsArray<T> = Array<T | CustomOption<T>>

const defaultBreakpoints = new Map()
  .set(1, breakpoints.viewport4)
  .set(2, breakpoints.viewport7)
  .set(3, breakpoints.viewport9)
  .set(4, breakpoints.viewport12)

// TODO: add more type-level stuff, overload typedefs, etc. so it looks strict and very elite
function useResponsive<T>(options: OptionsArray<T>): T {
  if (options.length === 0) throw new Error('Options cannot be empty.')

  if (options.some((x, i) => i > 4 && !isCustomQueryOption(x))) {
    throw new Error(
      'Options beyond first 5 entries must contain a custom query definition.',
    )
  }

  const [[, defaultElement], ...customQueryOptions] = options.map(
    monotonizeOption,
  )
  const matched = [defaultElement]

  for (const [mediaQuery, element] of customQueryOptions) {
    if (window.matchMedia(mediaQuery).matches) matched.unshift(element)
  }

  return matched[0]
}

function monotonizeOption<T>(
  ambiguousOption: T | CustomOption<T>,
  index: number,
): StringQueryOption<T> {
  if (isCustomQueryOption(ambiguousOption)) {
    const [breakpoint, element] = ambiguousOption

    return [stringifyMediaQuery(breakpoint), element]
  }

  const breakpoint = index > 0 ? defaultBreakpoints.get(index) : 'noop query'

  return [breakpoint, ambiguousOption]
}

function isCustomQueryOption<T>(value: any): value is CustomOption<T> {
  return Array.isArray(value)
}

export {useResponsive}
