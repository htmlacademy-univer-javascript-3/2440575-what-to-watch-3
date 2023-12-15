import Footer from '../../components/footer';
import Header from '../../components/header';
import FilmList from '../../components/film-list';
import FilmControls from '../../components/film-controls';
import FilmTabs from './film-tabs';
import RequestSuspense from '../../components/request-suspense';
import { useSelectedFilm } from '../../hooks/useSelectedFilm.ts';
import { useFavouriteFilms } from '../../hooks/useFavouriteFilms.ts';

export default function Film() {
  const { selectedFilm, suggestionPortion, reviews } = useSelectedFilm({
    shouldLoadReviews: true,
    shouldLoadSuggestions: true
  });
  const { favouriteFilms } = useFavouriteFilms();

  return (
    <RequestSuspense>
      <>
        {selectedFilm && (
          <section className="film-card film-card--full" style={{ backgroundColor: selectedFilm.backgroundColor }}>
            <div className="film-card__hero">
              <div className="film-card__bg">
                <img src={selectedFilm.backgroundImage} alt={selectedFilm.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header className="film-card__head">
                <Header.Logo />
                <Header.UserBlock />
              </Header>

              <div className="film-card__wrap">
                <div className="film-card__desc">
                  <h2 className="film-card__title">{selectedFilm.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{selectedFilm.genre}</span>
                    <span className="film-card__year">{selectedFilm.released}</span>
                  </p>

                  <FilmControls>
                    <FilmControls.PlayLink id={selectedFilm.id} />
                    <FilmControls.MyListButton listLength={favouriteFilms?.length} />
                    <FilmControls.AddReviewLink id={selectedFilm.id} />
                  </FilmControls>
                </div>
              </div>
            </div>

            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img
                    src={selectedFilm.posterImage}
                    alt={`${selectedFilm.name} poster`}
                    width="218"
                    height="327"
                  />
                </div>
                <FilmTabs reviews={reviews} {...selectedFilm} />
              </div>
            </div>
          </section>
        )}

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmList data={suggestionPortion} />
          </section>
          <Footer />
        </div>
      </>
    </RequestSuspense>
  );
}
