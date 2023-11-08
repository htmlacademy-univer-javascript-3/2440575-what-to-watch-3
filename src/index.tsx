import React from 'react';
import ReactDOM from 'react-dom/client';
import { filmsData } from './mocks/films.ts';
import { genresData } from './mocks/genres.ts';
import { reviewsData } from './mocks/reviews.ts';
import App from './components/App/App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmsData={filmsData}
      genresData={genresData}
      reviewsData={reviewsData}
    />
  </React.StrictMode>
);
