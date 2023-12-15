import { FilmsData } from '../../types';
import { GENRE_ALL_GENRES } from '../../config/config';
import { GenreListElement } from '../ui';

type GenreListProps = {
  filmsData: FilmsData;
  activeGenre: string | undefined;
  clickHandler: (genre: string) => void;
};

const GENRE_ITEM_ACTIVE_STYLE = 'catalog__genres-item--active';
const GenreList = ({filmsData, activeGenre, clickHandler}: GenreListProps) => (
  <ul className="catalog__genres-list">
    {
      filmsData
        .reduce((acc: string[], film) => acc.includes(film.genre) ? acc : [...acc, film.genre], [GENRE_ALL_GENRES])
        .map((genre): JSX.Element => (
          <GenreListElement
            key={self.crypto.randomUUID()}
            genre={genre}
            className={activeGenre === genre ? GENRE_ITEM_ACTIVE_STYLE : ''}
            clickHandler={clickHandler}
          />
        ))
    }
  </ul>
);

export default GenreList;
