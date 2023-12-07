import client, {
    setAuthorizationHeader,
    removeAuthorizationHeader
  } from '../../api/client';
import storage from '../../utils/storage';

  
/** authenticate a user and then 
 * ensure that all future requests are authorized with the obtained access token.
 * @param {*} credentials 
 * @returns 
 */
export const login = (credentials) => {  
    return client  
        .post('/api/auth/login', credentials) // POST request to '/auth/login' with provided credentials.
        .then(response => {
            const accessToken = response.data.accessToken; // Access the token from response.data
            if (accessToken) {
                setAuthorizationHeader(accessToken); 
                storage.set('auth', accessToken);
                // Set the Authorization header if token exists
                return response.data; // Return the response data for further processing
            } else {
                throw new Error('Access token not found in response');
            }
        })
        .catch(error => {
            console.error('Error during login call:', error);
            throw error; // Re-throw the error to be caught by the calling code
        });
};


export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };







