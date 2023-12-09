
import Portal from './Portal';
import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { useAuthHandlers } from '../AuthContext';
import { login } from '../service';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const { onLogin } = useAuthHandlers();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    let navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Limpia el estado de error antes de establecer uno nuevo

        try {
            const data = await login({
                email: event.target.email.value,
                password: event.target.password.value,
            });
            console.log('Successful login:', data);
            onLogin();
            navigate('/adverts');
        } catch (error) {
            let errorMessage = 'An error occurred while logging in.';
            if (error.response) {
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                console.error('Request:', error.request);
            } else {
                console.error('Error Message:', error.message);
            }
            setError(errorMessage); // Establece el mensaje de error para mostrarlo en la UI
            setTimeout(() => setError(''), 1500); // Borra el mensaje de error después de 5 segundos
        }
        

        if (rememberMe) {
            localStorage.setItem('userEmail', email);
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
        <Portal>
          {/* Todo tu JSX de LoginPage aquí */}
          <div className="login-modal-container">
                <div className="login-modal">
                    <h1>Log in to Papapop</h1>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input 
                            type="current-password" 
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
            </div>
        </Portal>
    );
  };
  
  export default LoginPage;

