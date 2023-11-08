import { AppRoute, HeaderStyleType } from '../../config/config';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isLoggedIn: boolean;
  headerStyleType?: HeaderStyleType;
  children?: JSX.Element | JSX.Element[];
}

const Header = ({isLoggedIn, headerStyleType, children}: HeaderProps):JSX.Element => (
  <header className={`page-header ${headerStyleType || ''}`}>
    <div className="logo">
      <Link to={AppRoute.Main} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
    {children}
    {
      isLoggedIn &&
        (
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={AppRoute.SignIn} className="user-block__link">{'Sign out'}</Link>
            </li>
          </ul>
        )
    }
  </header>
);

export default Header;
