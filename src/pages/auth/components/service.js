import client, {
    setAuthorizationHeader,
  } from '../../../api/client';

  
export const signup = (userData) => {
    return client
    .post('/api/auth/signup', userData)
    .then(response => {
        console.log(response);
        return response; //return the response for the next handler.
    })
    .catch(error => {
        console.error('Error during signup call:', error);
        throw error; //Throw the error to handle it in the handleSignup catch.
    });
};

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
                setAuthorizationHeader(accessToken); // Set the Authorization header if token exists
                //console.log('Access Token:', accessToken);
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