import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { filmsData } from './mocks/films.ts';
import { reviewsData } from './mocks/reviews.ts';
import App from './components/App/App.tsx';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmsData={filmsData}
        reviewsData={reviewsData}
      />
    </Provider>
  </React.StrictMode>
);
