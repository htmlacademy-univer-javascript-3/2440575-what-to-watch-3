import { PropsWithChildren } from 'react';
import Logo from './logo';
import UserBlock from './user-block';
import classNames from 'classnames';
import Breadcrumbs from './breadcrumbs';

interface HeaderProps extends PropsWithChildren {
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <header className={classNames('page-header', className)}>
      {children}
    </header>
  );
}

Header.Logo = Logo;
Header.UserBlock = UserBlock;
Header.Breadcrumbs = Breadcrumbs;
