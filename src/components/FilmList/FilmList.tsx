import FilmCard from '../FilmCard/FilmCard.tsx';
import { FilmData, FilmsData } from '../../types/filmData.ts';

type FilmListProps = {
  filmsData: FilmsData;
  maxCards?: number;
  genre?: string;
  clickHandler?: (item: FilmData) => void;
}

const FilmList = ({filmsData, maxCards, genre, clickHandler}: FilmListProps): JSX.Element => (
  <div className="catalog__films-list">
    {
      filmsData
        .filter((item) => genre ? item.genre.toLowerCase() === genre?.toLowerCase() : item)
        .filter((item, index) => maxCards ? index < maxCards : item)
        .map((item): JSX.Element => (
          <FilmCard
            key={item.id}
            film={item}
            clickHandler={() => clickHandler ? clickHandler(item) : ''}
          />
        ))
    }
  </div>
);

export default FilmList;
