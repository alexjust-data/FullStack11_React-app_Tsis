import client from '../../../api/client';


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