import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { filmData } from './config/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App name={filmData.name} genre={filmData.genre} promoDate={filmData.promoDate}></App>
  </React.StrictMode>
);
