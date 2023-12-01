import { useState } from 'react';
import Button from '../../components/Button';
import { signup } from './service';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        // Logica de registro
        try {
            await signup({
                email: email,
                password: password,
                username: username,
                name: name,
            });
        } catch (error) {
            // Manejar el error
            console.log(error);
            console.log("Pedaso de erroor!!!");
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
            <form onSubmit={handleSignup}>
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
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    value={username}
                    onChange={handleUserNameChange}
                />
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Button type="submit" variant="primary">
                    Sign up
                </Button>
            </form>
        </div>
    );
}

export default Signup;
