import { AppRoutes } from '../../types/routes.ts';
import './not-found-screen.css';
import { useAppDispatch } from '../../hooks';
import { clearRequestCount } from '../../store/api-actions.ts';
import { useNavigate } from 'react-router-dom';

export default function NotFoundScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRedirect() {
    dispatch(clearRequestCount())
      .then(() => navigate(AppRoutes.Main));
  }

  return (
    <div className="not-found-description">
      <span>Ошибка 404. Страница не найдена</span>
      <button className="redirect-button" onClick={handleRedirect}>Вернуться на главную страницу</button>
    </div>
  );
}
