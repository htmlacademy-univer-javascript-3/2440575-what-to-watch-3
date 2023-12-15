import { useAppDispatch, useAppSelector } from '../../../hooks';
import classNames from 'classnames';
import { setSelectedGenre } from '../../../store/film.ts';

export default function GenreList() {
  const { genres, selectedGenre } = useAppSelector((state) => state.film);
  const dispatch = useAppDispatch();

  function handleGenreChange(value: string) {
    if (value !== selectedGenre) {
      dispatch(setSelectedGenre(value));
    }
  }

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={classNames('catalog__genres-item', genre === selectedGenre && 'catalog__genres-item--active')}
          onClick={() => handleGenreChange(genre)}
        >
          <span className="catalog__genres-link">{genre}</span>
        </li>
      ))}
    </ul>
  );
}
