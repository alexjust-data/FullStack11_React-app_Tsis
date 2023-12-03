import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { login } from '../components/service';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    let navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // clean before setError

        try {
            const data = await login ({
                email: event.target.email.value,
                password: event.target.password.value,
            });
            console.log('Successful login:', data);
            navigate('/adverts');
        } catch (error) {
            let errorMessage = 'An error occurred while logging in.';
            if (error.response) {
                // The request was made and the server responded with a status code 
                // that falls out of the range 2xx
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error Message:', error.message);
            }
            setError(errorMessage); // Set the error message to display it in the UI
        }
        

        if (rememberMe) {
            localStorage.setItem('userEmail', email);
            // Almacena solo el email o un token de identificación, nunca la contraseña
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div>
            <h1>Log in to Tsis</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={handleEmailChange}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div>
                    <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                    />
                    <label>Remember password</label>
                </div>
                <Button type="submit" variant="primary">
                    Log in
                </Button>
                {error && <div className="loginPage-error">{error}</div>}
            </form>
        </div>
    );
}

export default LoginPage;

