import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App.tsx';
import { filmsData } from './mocks/films.ts';
import { reviewsData } from './mocks/reviews.ts';
import { store } from './store';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.tsx';
import { fetchFilmsAction } from './store/apiActions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilmsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App
        filmsData={filmsData}
        reviewsData={reviewsData}
      />
    </Provider>
  </React.StrictMode>
);
