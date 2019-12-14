import {stringifyMediaQuery} from '../src/media-query-kit'

describe('stringifyMediaQuery', () => {
  it('should handle plain strings', () => {
    expect(stringifyMediaQuery('(min-width: 1200px)')).toBe(
      '(min-width: 1200px)',
    )
  })

  it('should handle arrays', () => {
    expect(
      stringifyMediaQuery(['(min-width: 1200px)', '(min-height: 1080px)']),
    ).toBe('(min-width: 1200px), (min-height: 1080px)')
  })

  it('should handle objects', () => {
    expect(
      stringifyMediaQuery({'min-width': '1200px', 'min-height': '1080px'}),
    ).toBe('(min-width: 1200px), (min-height: 1080px)')
  })

  it('should handle objects w/ camelCase keys', () => {
    expect(stringifyMediaQuery({minWidth: '1200px', minHeight: '1080px'})).toBe(
      '(min-width: 1200px), (min-height: 1080px)',
    )
  })
})
