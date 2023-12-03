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
        <div className="welcome-container">
            <h1>Tsis</h1>
            <Button $primary onClick={handleLoginClick}>
                Log in
            </Button>
            <Button onClick={handleSignupClick}>
                Sign up
            </Button>
        </div>
    );
}

export default WelcomePage;
