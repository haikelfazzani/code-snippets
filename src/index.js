import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import GlobalProvider from './state/GlobalProvider';

import './index.css';
import './animation.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider><App /></GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
