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
          // style={({ isActive }) => (isActive ? { color: 'red' } : null)}
          >
          New Tweet
        </NavLink>
        <NavLink to="/adverts" className={navItemClassName} end>
          See latest tweets
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../../pages/auth/service'; 

// import './Header.css';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout().then(() => {
//       // Realiza cualquier limpieza necesaria aquí
      
//       navigate('/'); // Redirige al usuario a la página de inicio de sesión
//     });
//   };

//   return (
//     <header>
//       {/* ...otros elementos de tu cabecera... */}
//       <button onClick={handleLogout}>Logout</button>
//     </header>
//   );
// };

// export default Header;