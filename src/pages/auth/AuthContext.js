import { createContext, useContext, useMemo, useState } from 'react';

// Supongamos que este es tu modelo de usuario inicial
const initialUserState = {
  isLogged: false,
  user: null, // Aquí almacenarás información sobre el usuario
};

const AuthContext = createContext(initialUserState);
const AuthContextHandlers = createContext(undefined);

// Hook personalizado para utilizar la información del usuario
export const useAuth = () => {
  const auth = useContext(AuthContext);
  console.log('auth : ', auth)
  return auth;
};

// Hook personalizado para los manejadores de autenticación
export const useAuthHandlers = () => {
  const authHandlers = useContext(AuthContextHandlers);
  return authHandlers;
};

// Proveedor del contexto de autenticación
export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialUserState);

  const login = (userData) => {
    // Supongamos que 'userData' es el objeto que contiene la información del usuario, incluyendo su 'id'
    setAuthState({
      isLogged: true,
      user: userData, // Asegúrate de que 'userData' no sea undefined
    });
  };

  const logout = () => {
    // Simula el cierre de sesión
    setAuthState(initialUserState);
  };

  // Memoiza los manejadores para evitar recreaciones innecesarias
  const authHandlers = useMemo(
    () => ({
      onLogin: login,
      onLogout: logout,
    }),
    [],
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};



