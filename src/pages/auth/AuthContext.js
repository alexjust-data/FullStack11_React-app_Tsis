import { createContext, useContext, useState } from 'react';


const AuthContext = createContext(false);


export const useAuth = () => {
    const auth = useContext(AuthContext); // permite acceder al contexto de autenticación.
    return auth;
};

// Componente que proporciona el contexto de autenticación.
export const AuthContextProvider = ({ initiallyLogged, children }) => {
  const [isLogged, setIsLogged] = useState(initiallyLogged);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  // contiene el estado de autenticación y funciones para iniciar sesión y cerrar sesión.
  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  // Los componentes hijos dentro de "AuthContext.Provider" tendrán acceso al valor del contexto.
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
