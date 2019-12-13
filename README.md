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

type MediaQueryBreakpoint = string | {[key: string]: string} // note: object API is not implemented yet
type CustomQueryOption<T> = [MediaQueryBreakpoint, T] // usually, T is JSX.Element
type Option<T> = T | CustomQueryOption<T>

function useResponsive<T>(options: Option<T>[]): T
```

### usage
```tsx
/* HOOK OVERLOADS WITH EXAMPLES */

// without any responsiveness (included this due to React Hooks issues with conditionals)
// if there is a custom query it will be ignored
useResponsive([fallback])

// mobile + tablet/desktop
useResponsive([fallback, mobile, tabletOrDesktop])

// mobile + tablet + desktop
useResponsive([fallback, mobile, tablet, desktop])

// mobile portrait & landscape + tablet portrait & landscape + desktop
useResponsive([mobilePortrait, mobileLandscape, tabletPortrait, tabletLandscape, desktop])


// custom media query example
const mobile = <>mobile portrait</>
const mobileLandscape = ['(min-width: 481px) and (max-width: 767px)', <>mobile landscape</>] // ... as a string, *starting from this all following options in array must contain custom query (or first 5 should fallback to default queries?)
const tablet = [{'min-width': '768px', 'max-width': '1024px'}, <>tablet portrait</>] // ... as an object of CSS rules
const tabletLandscape = [{minWidth: '768px', maxWidth: '1024px', orientation: 'landscape'}, <>tablet landscape</>] // ... as an object of React-like CSS rules
const desktop = ['(min-width: 1025px) and (max-width: 1280px)', <>desktop</>]
const hiRes = ['(min-width: 1281px)', <>hi-res desktop</>] // ... for hi-res desktop, *since this option is beyond default media queries it has to contain a custom query

useResponsive([mobile, mobileLandscape, tablet, tabletLandscape, desktop, hiRes])
```

> Note: a value of the latest matching media query will be returned. And, if there are no matches at all then the first one is returned

---
Project was bootstrapped by [tsdx](https://github.com/jaredpalmer/tsdx)