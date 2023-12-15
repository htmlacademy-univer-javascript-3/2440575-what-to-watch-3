import { FilmData } from '../../../../types';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage.tsx';

const MAX_AUTHORS = 4;

type OverviewProps = {
  film?: FilmData;
}
const Overview = ({film}: OverviewProps): JSX.Element => {
  const translateRatingToText = (rating: number): string => {
    const ratingLabels: {[index: string]: string} = {
      '0': 'Bad',
      '1': 'Bad',
      '2': 'Bad',
      '3': 'Normal',
      '4': 'Normal',
      '5': 'Good',
      '6': 'Good',
      '7': 'Good',
      '8': 'Very good',
      '9': 'Very good',
      '10': 'Awesome',
    };
    return ratingLabels[Math.floor(rating).toString()];
  };
  return film ? (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.toString().replace('.', ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{translateRatingToText(film.rating)}</span>
          <span className="film-rating__count">{film.scoreCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {
            film.starring
              .filter((item, index) => MAX_AUTHORS ? index < MAX_AUTHORS : item)
              .map((item) => `${item}, `)
          }
            and other
          </strong>
        </p>
      </div>
    </>
  ) : (
    <NotFoundPage/>
  );
};
export default Overview;
