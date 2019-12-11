import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useResponsive} from '../src';

const App = () => {
  const content = useResponsive([<p>mobile</p>, <p>non-mobile</p>])
  return (
    <div>
      {content}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
