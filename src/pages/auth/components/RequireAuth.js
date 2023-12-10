import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../AuthContext';


function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();

  console.log(location)
  console.log(isLogged)

  return isLogged ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}

export default RequireAuth;