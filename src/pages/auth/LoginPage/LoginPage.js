import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { login } from '../components/service.js';
import styles from './';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        // Aquí agregarías la lógica de autenticación
        console.log(event.target)
        console.log(event.target.email.value)
        console.log(event.target.password.value)
        try {
            await login ({
                email: event.target.email.value,
                password: event.target.password.value,
            });
            // Aquí llamarías a tu API para iniciar sesión
            // Por ejemplo: await api.login(loginDto);
        } catch (error) {
            // Manejar el error
            console.log(error)
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
            </form>
        </div>
    );
}

export default LoginPage;

