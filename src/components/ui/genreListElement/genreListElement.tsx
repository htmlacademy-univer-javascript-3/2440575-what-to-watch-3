import { Link } from 'react-router-dom';
import cn from 'classnames';

type GenreListElementProps = {
  genre: string;
  className: string;
  clickHandler: (genre: string) => void;
}

export const GenreListElement = ({genre, className, clickHandler}: GenreListElementProps) => {
  const liClassNames = cn(
    'catalog__genres-item',
    className
  );
  return (
    <li className={liClassNames} onClick={() => clickHandler(genre)}>
      <Link to="#" className="catalog__genres-link">{genre}</Link>
    </li>
  );
};
