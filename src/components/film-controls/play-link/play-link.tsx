import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';

interface PlayLinkProps {
  id: string;
}

export default function PlayLink({id}: PlayLinkProps) {
  return (
    <Link
      className="btn btn--play film-card__button"
      type="button"
      to={AppRoutes.Player.replace(':id', id)}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
  );
}
