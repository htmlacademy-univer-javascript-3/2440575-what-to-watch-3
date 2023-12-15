import Header from '../../components/Header/Header.tsx';
import { FilmsData } from '../../types';
import NotFound404 from '../NotFoundPage/NotFoundPage.tsx';
import { Link, useParams } from 'react-router-dom';
import FilmList from '../../components/FilmList/FilmList.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { AppRoute, FilmRoute } from '../../config/config.ts';
import { Details, Overview, Reviews } from './FilmTabs';
import FilmNav from './FilmNav/FilmNav.tsx';
import { ReviewsData } from '../../types';
import { MyListBtn } from '../../components/ui';
import { useAppSelector } from '../../hooks';

const LIKE_THIS_CARDS = 4;

type FilmProps = {
  filmsData: FilmsData;
  reviewsData: ReviewsData;
};

const Film = ({filmsData, reviewsData}: FilmProps): JSX.Element => {
  const params = useParams();
  const films = useAppSelector((state) => state.films);
  const film =
    filmsData
      .find((item) => item.id === params.id);
  const renderTabs = (tabName: string | undefined): JSX.Element => {
    switch(tabName) {
      case FilmRoute.Overview:
        return <Overview film={film}/>;
      case FilmRoute.Details:
        return <Details film={film}/>;
      case FilmRoute.Reviews:
        return <Reviews reviews={reviewsData}/>;
      default:
        return <Overview film={film}/>;
    }
  };
  return film ? (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.posterImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <MyListBtn isFavorite={film.isFavorite}/>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={AppRoute.AddReview.replace(':id', film.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage} alt={film.name} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <FilmNav film={film} activeTab={params.info}/>
              {renderTabs(params.info)}
              {/*<Overview/>*/}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList filmsPreviewData={films} maxCards={LIKE_THIS_CARDS}/>
        </section>

        <Footer/>
      </div>
    </>
  ) : (
    <NotFound404/>
  );
};

export default Film;
