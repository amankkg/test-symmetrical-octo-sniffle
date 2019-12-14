/* eslint-disable no-native-reassign */

import * as React from 'react'

import {useResponsive} from '../src'
import * as breakpoints from '../src/default-breakpoints'

// ~~~ MONKEY PATCHING START 🙈🙊🙉 ~~~
// TODO: get rid of following mocking, it makes us to rely on internals of target function (white-box)
// jsdom does not implement `matchMedia`, so let's just patch it for our own needs
// ideally, instead of this one should just set window's height and width and just use `matchMedia` API
/**
 * Never match any media query
 */
function injectSupportedMediaQueryBreakpoint(): void

/**
 * Match a given media query only
 * @param {string} breakpoint - media query string to match
 */
function injectSupportedMediaQueryBreakpoint(breakpoint: string): void

function injectSupportedMediaQueryBreakpoint(breakpoint?: string) {
  window = Object.assign(window, {
    // Symbol is used to guarantee non-matching behavior
    matchMedia: (x: string) => ({matches: x === (breakpoint ?? Symbol())}),
  })
}

const defaultMatchMedia = window.matchMedia // undefined actually

const resetToDefaults = () => {
  window = Object.assign(window, {matchMedia: defaultMatchMedia})
}

afterEach(resetToDefaults)

// ~~~ MONKEY PATCHING END 🙈🙊🙉 ~~~

describe('useResponsive', () => {
  const initial = <p>initial</p>

  it('returns default value for single-item array', () => {
    const actual = useResponsive([initial])

    expect(actual).toBe(initial)
  })

  it('returns default value for single-item array even if media query not matched', () => {
    const breakpoint = '(min-width: 768px)'

    injectSupportedMediaQueryBreakpoint('(min-width: 768px)')

    expect(window.matchMedia(breakpoint).matches).toBe(true)

    const actual = useResponsive([[breakpoint, initial]])

    expect(actual).toBe(initial)
  })

  describe('handling of default media queries', () => {
    const cases = [
      <p>mobile portrait</p>,
      <p>mobile landscape</p>,
      <p>tablet portrait</p>,
      <p>tablet landscape</p>,
      <p>desktop</p>,
    ]

    it(`should fallback to mobile portrait (i.e. if a viewport is smaller than ${breakpoints.viewport4})`, () => {
      injectSupportedMediaQueryBreakpoint()

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          mobile portrait
        </p>
      `)
    })

    it(`should detect viewport ${breakpoints.viewport4} as mobile landscape`, () => {
      injectSupportedMediaQueryBreakpoint(breakpoints.viewport4)

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          mobile landscape
        </p>
      `)
    })

    it(`should detect viewport ${breakpoints.viewport7} as tablet portrait`, () => {
      injectSupportedMediaQueryBreakpoint(breakpoints.viewport7)

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          tablet portrait
        </p>
      `)
    })

    it(`should detect viewport ${breakpoints.viewport9} as tablet landscape`, () => {
      injectSupportedMediaQueryBreakpoint(breakpoints.viewport9)

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          tablet landscape
        </p>
      `)
    })

    it(`should detect viewport ${breakpoints.viewport12} as desktop`, () => {
      injectSupportedMediaQueryBreakpoint(breakpoints.viewport12)

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          desktop
        </p>
      `)
    })
  })

  describe('handling of custom breakpoints', () => {
    const hiResCustomOption = [
      '(min-width: 1280px)',
      <p>hi-res desktop</p>,
    ] as const

    const cases = [
      <p>mobile portrait</p>,
      <p>mobile landscape</p>,
      hiResCustomOption,
    ]

    it('should keep falling back to mobile portrait', () => {
      injectSupportedMediaQueryBreakpoint()

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          mobile portrait
        </p>
      `)
    })

    it(`should fallback to default media query breakpoint (in this case: mobile landscape / ${breakpoints.viewport4}) if there is no custom value`, () => {
      injectSupportedMediaQueryBreakpoint(breakpoints.viewport4)

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
          <p>
            mobile landscape
          </p>
        `)
    })

    it('should match custom media query breakpoint for latter argument entries', () => {
      injectSupportedMediaQueryBreakpoint(hiResCustomOption[0])

      const actual = useResponsive(cases)

      expect(actual).toMatchInlineSnapshot(`
        <p>
          hi-res desktop
        </p>
      `)
    })
  })

  it('should throw if options array is empty', () => {
    expect(() => useResponsive([])).toThrowError('Options cannot be empty.')
  })

  it('should throw if extra options do not provide media queries', () => {
    const options = [0,1,2,3,4,5,6]

    expect(() => useResponsive(options)).toThrowError('Options beyond first 5 entries must contain a custom query definition.')
  })
})
