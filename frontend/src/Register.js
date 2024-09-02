import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [newUser, setNewUser] = useState({ firstname: '', secondname: '', email: '', password: '' });
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/api/v1/auth/register', newUser);
    try {
      
      const token =response.data.token;
      localStorage.setItem('token',token);
      if(token=="User with this email already exists"){
        setRegisterError("User with this email already exists");
      }else{
        console.log("User created");
        navigate('/Login');
        setRegisterError(null);
      }
      
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
        setRegisterError(error.response.data.message || "Registration failed");
      } else {
        console.error("Error sending request:", error.message);
        setRegisterError("Registration failed");
      }
    }
  };

  const handleInputChange = (e, field) => {
    setNewUser({ ...newUser, [field]: e.target.value });
  };

  return (
    <div class="center-container">
    <div class="container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Firstname"
          value={newUser.firstname}
          onChange={(e) => handleInputChange(e, 'firstname')}
        />
        <input
          type="text"
          placeholder="Secondname"
          value={newUser.secondname}
          onChange={(e) => handleInputChange(e, 'secondname')}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => handleInputChange(e, 'password')}
        />
        <button type="submit">Sign Up</button>
      </form>
      {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
    </div>
    </div>
  );
};

export default Register;
