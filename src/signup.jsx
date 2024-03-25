import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from './firebaseConfig';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        // Basic validations
        if (!name || !email || !pass) {
            alert("Please fill in all fields.");
            return;
        }

        // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password validation (minimum length, at least one capital letter, one special character, and one number)
        const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
        if (!passRegex.test(pass)) {
            alert("Password must contain at least 6 characters including one uppercase letter, one special character, and one number.");
            return;
        }

        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
            if (user) {
                alert("Account Created Successfully");
                // Redirect to login page
                navigate('/login');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit(e);
        }
    };

    return (
        <>
            {/* Navigation */}
            <nav>
                <h1>BMS</h1>
                <ul>
                <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </nav>

            <div className='main-container_signup'>
                <div className='header'>
                    <h2>Signup</h2>
                </div>
                <form onKeyDown={handleKeyDown}>
                    <div className='box'>
                        <input type='text' value={name} placeholder='UserName' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='box'>
                        <input type='email' value={email} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='box'>
                        <input type='password' value={pass} placeholder='Password' onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <p>
                        Already have an account ? <Link to="/login">Login Now</Link>
                    </p>
                    <button onClick={submit}>Signup</button>
                </form>
            </div>
        </>
    );
};

export default Signup;