// import * as React from 'react';

type ViewportOption = JSX.Element | [string, JSX.Element]

function useResponsive(argz: Array<ViewportOption>): JSX.Element {
  // TODO: add more type-level so it looks very elite
  // TODO: refactor to support more overloads, now there are too many IF statements
  // TODO: support different types of CSS Media Query (object, React-like JS object)
  // TODO: add window resize listener?
  if (argz.length > 2) {
    const mq = 'length' in argz[2] ? argz[2][0] : '(min-width: 768px)'

    if (window.matchMedia(mq).matches)
      return 'length' in argz[2] ? argz[2][1] : argz[2]
  }

  if (argz.length > 1) {
    const mq = 'length' in argz[1] ? argz[1][0] : '(min-width: 480px)'

    if (window.matchMedia(mq).matches)
      return 'length' in argz[1] ? argz[1][1] : argz[1]
  }

  return 'length' in argz[0] ? argz[0][1] : argz[0]
}

export {useResponsive}
