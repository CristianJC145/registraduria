import React from 'react';
import './AppCard.css'; 

interface CardProps {
  imageSrc: string;
  description: string;
  price: string;
  sellerName: string;
  shippingPrice: string;
}

const AppCard: React.FC<CardProps> = ({ imageSrc, description, price, sellerName, shippingPrice }) => {
    const shipments = shippingPrice == 'Gratis' || 0 ? `Envío Gratis` : `Envío $${shippingPrice}`
  return (
    <div className="vs-card">
      <div className="vs-card-content-image">
        <img src={imageSrc} alt="Producto" className="vs-card-image" />
      </div>
      <div className="vs-card-info">
        <div className="vs-card-description">{description}</div>
        <div className="vs-card-price">${price}</div>
        <div className="vs-card-seller"><span>By</span>{sellerName}</div>
        <div className="vs-card-shipping">{shipments}</div>
      </div>
    </div>
  );
};

export default AppCard;