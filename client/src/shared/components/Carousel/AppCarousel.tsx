import React, { useState, useEffect } from 'react';
import AppButton from '../../components/Buttons/AppButton';
import './AppCarousel.css';

interface CarouselProps {
  images: string[];
  interval: number;
}

const AppCarousel: React.FC<CarouselProps> = ({ images, interval  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <div className="vs-carousel">
        <AppButton variant="dark" type="button" icon="angle-left" onClick={prevSlide} ></AppButton>
        <div className="vs-carousel-items">
            {images.map((image, index) => (
                <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
                />
            ))}
        </div>
        <AppButton variant="dark" type="button" icon="angle-right" onClick={nextSlide} ></AppButton>
    </div>
  );
};

export default AppCarousel;