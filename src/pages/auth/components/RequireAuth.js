import { Navigate, useLocation } from 'react-router';
import { useIsLogged } from '../AuthContext';

function RequireAuth({ children }) {
  const location = useLocation();
  const isLogged = useIsLogged();

  console.log(location)
  console.log(isLogged)

  return isLogged ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}

export default RequireAuth;