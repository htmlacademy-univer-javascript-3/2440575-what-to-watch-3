import { FilmsData } from '../../types';
import Header from '../../components/Header/Header.tsx';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';
import { AppRoute, FilmRoute } from '../../config/config.ts';
import AddReviewForm from '../../components/AddReviewForm/AddReviewForm.tsx';

type ReviewProps = {
  filmsData: FilmsData;
};

const AddReview = ({filmsData}: ReviewProps) => {
  const params = useParams();
  const film =
    filmsData
      .find((item) => item.id === params.id);

  return film ? (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header isLoggedIn>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film.replace(':id', film.id) + FilmRoute.Overview} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.AddReview.replace(':id', film.id)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm/>

    </section>
  ) : (
    <NotFoundPage/>
  );
};
export default AddReview;
