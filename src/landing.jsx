import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'; // Import the CSS file

function LandingPage() {
  return (
    <div>
      <nav>
        <h1>BMS</h1>
        <ul>
          
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to BMS</h1>
        <p>"Streamline Your Finances, Seamlessly Manage Bills."</p>
      </div>
    </div>
  );
}

export default LandingPage;