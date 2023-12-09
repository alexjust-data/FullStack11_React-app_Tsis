import { useState, useEffect } from 'react';
import Button from '../../../components/shared/Button';
import { signup } from './service';
import { useNavigate } from 'react-router-dom';
import './Signup.css';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(''); // Estado para manejar el mensaje de error
    let navigate = useNavigate(); // Hook para la redirección

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 2000); // Limpiar el error después de 2 segundos
            return () => clearTimeout(timer);
        }
    }, [error]);

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
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            let errorMessage = 'Se ha producido un error inesperado. Inténtalo de nuevo.';
            if (error.response && error.response.status === 500) {
                // Especificar mensaje de error basado en la respuesta del servidor
                errorMessage = 'El usuario ya existe.';
            }
            setError(errorMessage);
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

    const handleGoBack = () => {
        navigate('/');
    };

    return (
<div className="signup-page">
      <div className="signup-container">
        <button className="go-back-button" onClick={handleGoBack}>
            ← Back
        </button>
        <h3 className="signup-title">Sign up</h3>
        <form onSubmit={handleSignup}>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUserNameChange}
            required
          />
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <div className="button-container">
            <Button type="submit" className="signup-button">
              Sign up
            </Button>
            {error && <div className="signup-error error-visible">{error}</div>}
          </div>
        </form>
      </div>
    </div>
    );
}

export default Signup;