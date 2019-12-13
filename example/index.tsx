import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {useResponsive} from '../src'

const App = () => {
  // TODO: add very impressive demo
  const [width, setWidth] = React.useState(window.innerWidth)
  
  React.useEffect(() => {
    const interval = setInterval(() => setWidth(window.innerWidth), 200)

    return () => clearInterval(interval)
  }, [])

  const content = useResponsive([
    <p>default:     less than 480px</p>,
    <p>viewport4:   (min-width: 480px)</p>,
    <p>viewport7:   (min-width: 768px)</p>,
    <p>viewport9:   (min-width: 992px)</p>,
    <p>viewport12:  (min-width: 1200px)</p>,
  ])

  return (
    <div>
      <p>Resize a window to see changes</p>
      <p>width: {width}</p>
      {content}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
