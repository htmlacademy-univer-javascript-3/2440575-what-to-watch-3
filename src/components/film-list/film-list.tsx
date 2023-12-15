import FilmCard from '../film-card';
import type { FilmPreview } from '../../types/film.ts';

interface FilmListProps {
  data: FilmPreview[];
}

export default function FilmList({ data }: FilmListProps) {
  return (
    <div className="catalog__films-list">
      {data.map((value) => (
        <FilmCard key={value.id} {...value} />
      ))}
    </div>
  );
}
