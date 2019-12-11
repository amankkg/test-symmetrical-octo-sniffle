import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import {useResponsive} from '../src'

/* HOOK OVERLOADS */

// without any responsiveness (included this due to React Hooks issues with conditionals)
// function useResponsive([ReactElement]) : ReactElement

// mobile + tablet/desktop
// function useResponsive([Mobile, Tablet | Desktop]) : ReactElement

// mobile + tablet + desktop
// function useResponsive([Mobile, Tablet, Desktop]) : ReactElement

// mobile portrait & landscape + tablet portrait & landscape + desktop
// function useResponsive([MobilePortrait, MobileLandscape, TabletPortrait, TabletLandscape, Desktop]) : ReactElement

// custom media query example
// const mobile = <>mobile portrait</>
// ... as a string
// const mobileLandscape = ['(min-width: 481px) and (max-width: 767px)', <>mobile landscape</>]
// ... as an object of CSS rules
// const tablet = [{'min-width': '768px', 'max-width': '1024px'}, <>tablet portrait</>]
// ... as an object of React-like CSS rules
// const tabletLandscape = [{minWidth: '768px', maxWidth: '1024px', orientation: 'landscape'}, <>tablet landscape</>]
// const desktop = ['(min-width: 1025px) and (max-width: 1280px)', <>desktop</>]
// ... for hi-res desktop
// const hiRes = ['(min-width: 1281px)', <>hi-res desktop</>]

// function useResponsive([mobile, mobileLandscape, tablet, tabletLandscape, desktop, hiRes]) : ReactElement

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<div />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
