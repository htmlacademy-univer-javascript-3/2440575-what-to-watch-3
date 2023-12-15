import { FilmPreviewData } from '../../types';
import Header from '../Header/Header.tsx';
import { HeaderStyleType } from '../../config/config.ts';
import ListButton from '../ListButton/ListButton.tsx';

type FilmPreviewProps = {
  filmPreview: FilmPreviewData;
}

const FilmPreview = ({filmPreview}: FilmPreviewProps): JSX.Element => (
  <section className="film-card">
    <div className="film-card__bg">
      <img
        src={filmPreview.previewImage}
        alt={filmPreview.name}
      />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <Header
      isLoggedIn
      headerStyleType={HeaderStyleType.Film}
    />

    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img
            src={filmPreview.previewImage}
            alt={filmPreview.name}
            width="218"
            height="327"
          />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{filmPreview.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{filmPreview.genre}</span>
            <span className="film-card__year">{'НЕТ ДАТЫ В PREVIEW!'}</span>
          </p>

          <div className="film-card__buttons">
            <button
              className="btn btn--play film-card__button"
              type="button"
            >
              <svg
                viewBox="0 0 19 19"
                width="19"
                height="19"
              >
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button
              className="btn btn--list film-card__button"
              type="button"
            >
              <ListButton isFavorite/>
              <span>My list</span>
              <span className="film-card__count">9</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FilmPreview;
