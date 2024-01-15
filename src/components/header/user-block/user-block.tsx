import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../types/routes.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { signOut } from '../../../store/api-actions.ts';
import { AuthorizationStatus } from '../../../types/user.ts';

export default function UserBlock() {
  const { authorizationStatus, avatarUrl } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    authorizationStatus === AuthorizationStatus.Authorized ? (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(AppRoutes.MyList)}>
            <img src={avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li
          className="user-block__item"
          onClick={() => {
            dispatch(signOut());
          }}
        >
          <span className="user-block__link">Sign out</span>
        </li>
      </ul>
    ) : (
      <div className="user-block">
        <Link to={AppRoutes.SignIn} className="user-block__link">Sign in</Link>
      </div>
    )
  );
}
