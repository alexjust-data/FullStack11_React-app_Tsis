import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import { useAuthHandlers, useAuth } from '../AuthContext';
import { logout } from '../service';


function AuthButton({ className }) {
  const { isLogged } = useAuth();
  const { onLogout } = useAuthHandlers();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" $variant="primary" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
