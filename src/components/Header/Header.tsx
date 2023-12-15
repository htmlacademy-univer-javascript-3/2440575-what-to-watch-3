import { AppRoute, AuthStatus, HeaderStyleType } from '../../config/config.ts';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/apiActions.ts';
// Поменять ссылку на Link

type HeaderProps = {
  headerStyleType?: HeaderStyleType;
  children?: JSX.Element | JSX.Element[];
}

const Header = ({headerStyleType, children}: HeaderProps):JSX.Element => {
  const {avatarUrl} = useAppSelector((state) => state.user);
  const authorizationStatus = useAppSelector((state) => state.authStatus);
  const dispatch = useAppDispatch();
  return (
    <header className={`page-header ${headerStyleType || ''}`}>
      <div className="logo">
        <Link
          to={AppRoute.Main}
          className="logo__link"
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
      {
        authorizationStatus === AuthStatus.Auth ?
          (
            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <a
                  href=""
                  className="user-block__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                >Sign out
                </a>
              </li>
            </ul>
          ) : (
            <div className="user-block">
              <Link
                to={AppRoute.SignIn}
                className="user-block__link"
              >Sign in
              </Link>
            </div>
          )
      }
    </header>
  );
};

export default Header;
