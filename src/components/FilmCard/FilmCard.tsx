import { Link } from 'react-router-dom';
import { AppRoute, FilmRoute } from '../../config/config.ts';
import { FilmData } from '../../types/filmData.ts';

type FilmCardProps = {
  film: FilmData;
  clickHandler: (item: FilmData) => void;
  mouseOverHandler: (item: FilmData) => void;
}
const FilmCard = ({film, clickHandler, mouseOverHandler}: FilmCardProps): JSX.Element =>
  (
    <article
      key={film.id}
      onClick={() => clickHandler(film)}
      onMouseOver={() => mouseOverHandler(film)}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <img
          src={film.posterImage}
          alt={film.name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={`${AppRoute.Film.replace(':id', film.id).replace(':info', FilmRoute.Overview)}`}
          className="small-film-card__link"
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );

export default FilmCard;
