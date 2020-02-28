import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LyricsProvider } from './providers/LyricsProvider';

ReactDOM.render(
  <LyricsProvider>
    <App />
  </LyricsProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
