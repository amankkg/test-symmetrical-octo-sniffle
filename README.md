# `useResponsive` hook

Responsiveness in a React-way

## Inspiration

Inconvenience implementing responsive web design (RWD) by default in React apps.
Eventually, one will copy & paste same CSS media queries from one code base to another.

Here comes `useResponsive` hook with default media query breakpoints, which are [shamelessly stolen from here](https://ricostacruz.com/til/css-media-query-breakpoints), while still being customizable.

Default media queries are these:

```css
/* default, i.e. min-width < 480px */             /*  mobile, protrait */
@custom-media --viewport-4 (min-width: 480px);    /*  mobile, landscape */
@custom-media --viewport-7 (min-width: 768px);    /*  tablet, portrait */
@custom-media --viewport-9 (min-width: 992px);    /*  tablet, landscape */
@custom-media --viewport-12 (min-width: 1200px);  /*  desktop */
```

## API, usage

You should be able to read TypeScript.

### type alias
```tsx
/* MEDIA QUERY BREAKPOINT */

type CssRule = 'min-width' | 'max-width' | 'min-height' | 'max-height' | ... // TODO: should be easier :)

type Breakpoint = string // string here must be a valid CSS Media Query
  | {[CssRule]: string} // string here must contain units, e.g. 'px'


/* VIEWPORT */

type MobilePortrait = ReactElement | [Breakpoint, ReactElement]
type MobileLandscape = ReactElement | [Breakpoint, ReactElement]
type Mobile = MobilePortrait | MobileLandscape

type TabletPortrait = ReactElement | [Breakpoint, ReactElement]
type TabletLandscape = ReactElement | [Breakpoint, ReactElement]
type Tablet = TabletPortrait | TabletLandscape

type Desktop = ReactElement | [Breakpoint, ReactElement]
```

### usage
```tsx
/* HOOK OVERLOADS */

// without any responsiveness (included this due to React Hooks issues with conditionals)
function useResponsive([ReactElement]) : ReactElement

// mobile + tablet/desktop
function useResponsive([Mobile, Tablet | Desktop]) : ReactElement

// mobile + tablet + desktop
function useResponsive([Mobile, Tablet, Desktop]) : ReactElement

// mobile portrait & landscape + tablet portrait & landscape + desktop
function useResponsive([MobilePortrait, MobileLandscape, TabletPortrait, TabletLandscape, Desktop]) : ReactElement

// custom media query example
const mobile = <>mobile portrait</>
// ... as a string
const mobileLandscape = ['(min-width: 481px) and (max-width: 767px)', <>mobile landscape</>]
// ... as an object of CSS rules
const tablet = [{'min-width': '768px', 'max-width': '1024px'}, <>tablet portrait</>]
// ... as an object of React-like CSS rules
const tabletLandscape = [{minWidth: '768px', maxWidth: '1024px', orientation: 'landscape'}, <>tablet landscape</>]
const desktop = ['(min-width: 1025px) and (max-width: 1280px)', <>desktop</>]
// ... for hi-res desktop
const hiRes = ['(min-width: 1281px)', <>hi-res desktop</>]

function useResponsive([mobile, mobileLandscape, tablet, tabletLandscape, desktop, hiRes]) : ReactElement
```

> Note: arguments in `useResponsive` hook should be ordered by screen size ascending because we match Media Queries in opposite order (i.e. larger resolutions first)

---
Project was bootstrapped by [tsdx](https://github.com/jaredpalmer/tsdx)