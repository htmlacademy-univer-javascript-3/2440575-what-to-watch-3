import FilmCard from '../FilmCard/FilmCard';
import { FilmsPreviewData, FilmPreviewData } from '../../types';

type FilmListProps = {
  filmsPreviewData: FilmsPreviewData;
  maxCards?: number;
  clickHandler?: (item: FilmPreviewData) => void;
}

const FilmList = ({filmsPreviewData, maxCards, clickHandler}: FilmListProps): JSX.Element => (
  <div className="catalog__films-list">
    {
      filmsPreviewData
        .filter((item, index) => maxCards ? index < maxCards : item)
        .map((item): JSX.Element => (
          <FilmCard
            key={item.id}
            filmPreview={item}
            clickHandler={() => clickHandler ? clickHandler(item) : ''}
          />
        ))
    }
  </div>
);

export default FilmList;
