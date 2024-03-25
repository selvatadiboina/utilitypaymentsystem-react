import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebaseConfig';
import './sign.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const adminEmail = 'Admin@gmail.com';
    const adminPassword = 'Admin@123';
    try {
      let userCredential = await firebase.auth().signInWithEmailAndPassword(email, pass);
      if (userCredential) {
        if (email === adminEmail && pass === adminPassword) {
          // Redirect admin to adminhome
          window.location.href = '/adminhome';
        } else {
          // Redirect customer to home
          window.location.href = '/home';
        }
        return; // Prevent redirection to login page on browser back button click
      }
    } catch (error) {
      alert(error);
      // No need to redirect back to the login page here
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(e);
    }
  };

  return (
    <>
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
          <h2>Login</h2>
        </div>
        <form onKeyDown={handleKeyDown}>
          <div className='box'>
            <input type='email' value={email} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className='box'>
            <input type='password' value={pass} placeholder='Password' onChange={(e) => setPass(e.target.value)}></input>
          </div>
          <p>
            Don't have an account ? <Link to="/signup">Create Account</Link>
          </p>
          <button onClick={submit}>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login;
