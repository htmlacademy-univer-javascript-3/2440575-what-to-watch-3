import Header from '../Header/Header.tsx';
import { HeaderStyleType } from '../../config/config.ts';
import ListButton from '../ListButton/ListButton.tsx';
import { FilmData } from '../../types/filmData.ts';

type FilmPreviewProps = {
  film: FilmData;
}

const FilmPreview = ({film}: FilmPreviewProps): JSX.Element => (
  <section className="film-card">
    <div className="film-card__bg">
      <img
        src={film.backgroundImage}
        alt={film.name}
      />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <Header isLoggedIn headerStyleType={HeaderStyleType.Film}/>

    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img
            src={film.posterImage}
            alt={film.name}
            width="218"
            height="327"
          />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{film.genre}</span>
            <span className="film-card__year">{film.released}</span>
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
              <ListButton isFavorite={film.isFavorite}/>
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
