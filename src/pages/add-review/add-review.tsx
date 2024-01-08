import Header from '../../components/header';
import AddReviewForm from './add-review-form';
import { useSelectedFilm } from '../../hooks/use-selected-film.ts';
import RequestSuspense from '../../components/request-suspense';

export default function AddReview() {
  const { selectedFilm } = useSelectedFilm({});

  return (
    <RequestSuspense>
      <section className="film-card film-card--full">
        {selectedFilm && (
          <>
            <div className="film-card__header">
              <div className="film-card__bg">
                <img src={selectedFilm.backgroundImage} alt={selectedFilm.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header>
                <Header.Logo />
                <Header.Breadcrumbs name={selectedFilm.name} id={selectedFilm.id} />
                <Header.UserBlock />
              </Header>

              <div className="film-card__poster film-card__poster--small">
                <img src={selectedFilm.posterImage} alt={`${selectedFilm.name} poster`} width="218" height="327" />
              </div>
            </div>

            <div className="add-review">
              <AddReviewForm />
            </div>
          </>
        )}
      </section>
    </RequestSuspense>
  );
}
