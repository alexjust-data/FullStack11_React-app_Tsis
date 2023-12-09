// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button';
import './WelcomePage.css';

function WelcomePage() {
    let navigate = useNavigate();

    function handleLoginClick() {
        navigate('/login'); // Navega a la página de login
    }
    
    function handleSignupClick() {
        navigate('/signup'); // Navega a la página de signup
    }

    return (
        <div className="welcome-backdrop">
            <div className="welcome-modal">
                <h1>Papapop</h1>
                <p>Consigue los mejores precios y gana dinero con lo que no usas.</p>
                <Button onClick={handleSignupClick}>
                    Crea tu usuario
                </Button>
                <div className="login-signup-switch">
                    ¿Ya tienes una cuenta? <span onClick={handleLoginClick}>Iniciar sesión</span>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
