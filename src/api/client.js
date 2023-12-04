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


/** Takes a token as argument and uses it to set the 'Authorization' header to Axios, 
 * preceded by the word 'Bearer'. This is typical in token-based authentication.
 * @param {*} token 
 * @returns 
 */
export const setAuthorizationHeader = token =>
(client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

export default client;