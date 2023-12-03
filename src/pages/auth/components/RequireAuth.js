import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../AuthContext';

function RequireAuth({ children }) {
  const location = useLocation(); // Obtiene la ubicación actual de la ruta
  const { isLogged } = useAuth(); // Obtiene el estado de autenticación

  return isLogged ? (
    // Si está autenticado, permite el acceso a los componentes hijos.
    children
  ) : (
    // Si no está autenticado, redirige a la página "/signup".
    <Navigate to="/signup" state={{ from: location }} />
  );
}

export default RequireAuth;
