/**
 * This is your React component where users register.
 */
import { useState } from 'react';
import Button from '../../../components/shared/Button';
import { signup } from '../components/service';
import { useNavigate } from 'react-router-dom';
import './Signup.css';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');

    let navigate = useNavigate(); // Hook para la redirección

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await signup({
                email: email,
                password: password,
                username: username,
                name: name,
            });
            console.log('Registro exitoso:', response.data);
            // Redirigir al usuario a la página de inicio de sesión
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un estado fuera del rango 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error(error.request);
            } else {
                // Algo sucedió al configurar la solicitud que disparó un error
                console.error('Error', error.message);
            }
        }
        
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <h1>Sign up</h1>
            <div className="form-container">
                <form onSubmit={handleSignup}>
                    <input 
                        className="input-field"
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input 
                        className="input-field"
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input 
                        className="input-field"
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        value={username}
                        onChange={handleUserNameChange}
                    />
                    <input 
                        className="input-field"
                        type="text" 
                        name="name" 
                        placeholder="Full Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <div className="button-container">
                        <Button type="submit" variant="primary">
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;