import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AuthorizationStatus } from '../../../types/user.ts';
import { loadFavoriteFilms, setIsFavorite } from '../../../store/api-actions.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';

interface MyListButtonProps {
  listLength?: number;
}

export default function MyListButton({ listLength }: MyListButtonProps) {
  const { selectedFilm } = useAppSelector((state) => state.film);
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleStatusToggle() {
    dispatch(setIsFavorite({ filmId: String(selectedFilm?.id), status: Number(!selectedFilm?.isFavorite) }))
      .unwrap()
      .then(() => dispatch(loadFavoriteFilms()));
  }

  function handleClick() {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      handleStatusToggle();
    } else {
      navigate(AppRoutes.SignIn);
    }
  }

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleClick}>
      {selectedFilm?.isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add" />
        </svg>
      )}
      <span>My list</span>
      <span className="film-card__count">{Number(listLength)}</span>
    </button>
  );
}
