import { FilmData } from '../../../../types';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage.tsx';

type DetailsProps = {
  film?: FilmData;
}

const Details = ({film}: DetailsProps): JSX.Element => film ? (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {
            film.starring.map((item) =>
              (
                <>
                  {item} <br></br>
                </>
              )
            )
          }
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{`${Math.trunc(film.runTime / 60)}:${film.runTime % 60}`}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film.released}</span>
      </p>
    </div>
  </div>
) : (
  <NotFoundPage/>
);
export default Details;
