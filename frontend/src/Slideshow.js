import React, { useState } from 'react';
import './Slideshow.css';

const Slideshow = ({ slides }) => {
  const validSlides = slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % validSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + validSlides.length) % validSlides.length);
  };

  return (
    <div className="slideshow-container">
      <div className="slide fade">
        {validSlides.length > 0 && (
          <img src={validSlides[currentSlide].image} alt={validSlides[currentSlide].alt} />
        )}
      </div>
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slideshow;
