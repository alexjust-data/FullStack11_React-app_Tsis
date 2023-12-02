import axios from 'axios';


/** The server expects to receive the data in JSON format
 * curl -X POST "http://localhost:3001/api/auth/signup" 
 * -H  "accept: *\/*" 
 * -H  "Content-Type: application/json"
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// No necesitas las funciones de Authorization aquí si son solo para el registro.
// Solo las añades después de que el usuario esté autenticado y tengas un token.

// export const setAuthorizationHeader = token =>
//   (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

// export const removeAuthorizationHeader = () => {
//   delete client.defaults.headers.common['Authorization'];
// };


export default client;



