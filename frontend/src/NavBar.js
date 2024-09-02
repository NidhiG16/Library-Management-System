import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Crud from './Crud';
import './NavBar.css';
import Home from './Home';

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Crud">Create your library</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Crud" element={<Crud />} />
      </Routes>
    </div>
  );
};

export default NavBar;
