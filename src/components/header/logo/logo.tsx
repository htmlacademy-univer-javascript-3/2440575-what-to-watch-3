import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';

export default function Logo() {
  return (
    <div className="logo">
      <Link to={AppRoutes.Main} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
