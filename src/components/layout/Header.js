import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import AuthButton from '../../pages/auth/components/AuthButton';

import './Header.css';

const navItemClassName = ({ isActive }) =>
clsx('header-nav-item', { active: isActive });

function Header({ className }) {
  return (
    <header className={clsx('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={32} height={32} fill="red" />
          {/* <img src={logo} alt="twitter-react" /> */}
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          replace
          className={navItemClassName}
          >
          New Tweet
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;