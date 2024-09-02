import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', credentials);
    try {
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(token);
      if(token=="Email or passowrd mismatch"){
        setLoginError("Invalid email or password. Please try again or Register if you haven't.");
      }else{
        alert('Login successful');
        Navigate('/Crud');
        setLoginError(null);
      }
      
    } catch (error) {
      console.error(error);
        setLoginError("An error occurred during login. Please try again .");
      }
    }
  

  return (
    <div class="center-container">
    <div class="container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <Link to="/Register">Register</Link>
    </div>
    </div>
  );
};

export default Login;
