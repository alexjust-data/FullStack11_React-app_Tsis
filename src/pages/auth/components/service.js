// import client, {
// setAuthorizationHeader,
//   } from '../../api/client';


import client from '../../../api/client';

export const login = (credentials) => {  
    return client  
        .post('/api/auth/login', credentials)// petición POST a '/auth/login' con credenciales proporcionadas.
        .then(response => console.log(response));// En caso de éxito, registra la respuesta en la consola.
}

export const signup = (userData) => {
    return client
        .post('/api/auth/signup', userData)
        .then(response => {
            console.log(response);
            return response; // Asegúrate de devolver la respuesta para el siguiente manejador.
        })
        .catch(error => {
            console.error('Error durante la llamada de signup:', error);
            throw error; // Lanza el error para manejarlo en el catch del handleSignup.
        });
};



// export const signup = (credentials) => {  
//     return client  
//         .post('/api/auth/signup', credentials)
//         .then(({accessToken}) => setAuthorizationHeader(accessToken));
// };


