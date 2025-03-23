import React, { useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here (e.g., API call to authenticate user)
        console.log('Email:', email);
        console.log('Password:', password);

        // Close the popup after login (or handle success/error)
        setShowLogin(false);
    };

    return (
        <div className='login-popup-overlay'>
            <div className='login-popup'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
                    <button type='button' onClick={() => setShowLogin(false)}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;