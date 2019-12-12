import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {useResponsive} from '../src'

const App = () => {
  // TODO: add very impressive demo
  const content1 = useResponsive([<p>mobile</p>, <p>non-mobile</p>])
  const content2 = useResponsive([<p>mobile</p>, <p>tablet</p>, <p>desktop</p>])
  const content3 = useResponsive([
    ['not needed?', <p>less than 450px</p>],
    ['(min-width: 450px)', <p>more than 450px</p>],
    ['(min-width: 750px)', <p>more than 750px</p>],
  ])

  return (
    <div>
      {content1}
      {content2}
      {content3}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
