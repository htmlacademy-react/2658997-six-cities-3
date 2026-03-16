import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {OFFERS_COUNT} from './const.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App count={OFFERS_COUNT}/>
  </React.StrictMode>
);
