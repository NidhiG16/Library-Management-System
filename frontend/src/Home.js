import React from 'react';
import NavBar from './NavBar';
import Slideshow from './Slideshow';
import './Home.css';
const slides = [
  { image: '/images/slide1.jpg', alt: 'Slide 1' },
  { image: '/images/slide2.jpg', alt: 'Slide 2' },
  { image: '/images/slide3.jpg', alt: 'Slide 3' },
];
const Home = () => {
  return (
    <div>
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=swap" rel="stylesheet" />

      </head>
      
        <NavBar />
      <h1>Carpe Librum</h1>
      <Slideshow slides={slides}/>
    </div>
  );
};

export default Home;
