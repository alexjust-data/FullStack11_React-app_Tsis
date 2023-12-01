import client, {
    setAuthorizationHeader,
  } from '../../api/client';




export const login = (credentials) => {  
    return client  
        .post('/api/auth/login', credentials)// petición POST a '/auth/login' con credenciales proporcionadas.
        .then(response => console.log(response));// En caso de éxito, registra la respuesta en la consola.
}


export const signup = (credentials) => {  
    return client  
        .post('/api/auth/signup', credentials)
        .then(({accessToken}) => setAuthorizationHeader(accessToken));
};


