import { Link } from 'react-router-dom';
import { AppRoute, FilmRoute } from '../../../config/config.ts';
import { FilmData } from '../../../types/filmData.ts';

type FilmNavProps = {
  film: FilmData;
  activeTab?: string;
}
const FilmNav = ({film, activeTab = FilmRoute.Overview}: FilmNavProps): JSX.Element => (
  <nav className="film-nav film-card__nav">
    <ul className="film-nav__list">
      <li className={`film-nav__item ${activeTab === FilmRoute.Overview ? 'film-nav__item--active' : ''}`}>
        <Link to={AppRoute.Film.replace(':id', film.id).replace(':info', FilmRoute.Overview)} className="film-nav__link">Overview</Link>
      </li>
      <li className={`film-nav__item ${activeTab === FilmRoute.Details ? 'film-nav__item--active' : ''}`}>
        <Link to={AppRoute.Film.replace(':id', film.id).replace(':info', FilmRoute.Details)} className="film-nav__link">Details</Link>
      </li>
      <li className={`film-nav__item ${activeTab === FilmRoute.Reviews ? 'film-nav__item--active' : ''}`}>
        <Link to={AppRoute.Film.replace(':id', film.id).replace(':info', FilmRoute.Reviews)} className="film-nav__link">Reviews</Link>
      </li>
    </ul>
  </nav>
);

export default FilmNav;
