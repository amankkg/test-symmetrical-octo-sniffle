// import * as React from 'react';

// /* default, i.e. min-width < 480px */             /*  mobile, protrait */
// @custom-media --viewport-4 (min-width: 480px);    /*  mobile, landscape */
// @custom-media --viewport-7 (min-width: 768px);    /*  tablet, portrait */
// @custom-media --viewport-9 (min-width: 992px);    /*  tablet, landscape */
// @custom-media --viewport-12 (min-width: 1200px);  /*  desktop */

/* MEDIA QUERY BREAKPOINT */
/*
  type CssRule = 'min-width' | 'max-width' | 'min-height' | 'max-height'  // TODO: should be easier :)

  type Breakpoint = string // string here must be a valid CSS Media Query
    | {[CssRule]: string} // string here must contain units, e.g. 'px'
    | React.CSSProperties
*/

/* VIEWPORT */
/*
  type MobilePortrait = JSX.Element | [Breakpoint, JSX.Element]
  type MobileLandscape = JSX.Element | [Breakpoint, JSX.Element]
  type Mobile = MobilePortrait | MobileLandscape

  type TabletPortrait = JSX.Element | [Breakpoint, JSX.Element]
  type TabletLandscape = JSX.Element | [Breakpoint, JSX.Element]
  type Tablet = TabletPortrait | TabletLandscape

  type Desktop = JSX.Element | [Breakpoint, JSX.Element]
*/

function useResponsive(argz: JSX.Element[]): JSX.Element {
  if (argz.length === 1) return argz[0]

  if (window.matchMedia('(min-width: 480px)').matches) return argz[1]

  return argz[0]
}

export {useResponsive}
