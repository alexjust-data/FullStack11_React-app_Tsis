import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import { useAuth } from '../AuthContext'; // Corrected import
import { logout } from '../service';
import { useNavigate } from 'react-router-dom';

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth(); // Corrected usage of useAuth hook
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
    navigate('/');
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
