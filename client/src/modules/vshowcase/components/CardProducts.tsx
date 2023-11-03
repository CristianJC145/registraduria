import React from 'react';
import '../css/AppCard.css'
import LazyImage from '../../../shared/components/LazyImage';

interface CardProps {
  imageSrc: string;
  description: string;
  price: string;
  sellerName: string;
  shippingPrice: string;
}

const CardProducts: React.FC<CardProps> = ({ imageSrc, description, price, sellerName, shippingPrice }) => {
    const shipments = shippingPrice == 'Gratis' || 0 ? `Envío Gratis` : `Envío $${shippingPrice}`
  return (
    <div className="vs-cardProducts">
      <div className="vs-cardProducts-content-image">
        <LazyImage  src={imageSrc} alt="Product" className="vs-cardProducts-image" />
      </div>
      <div className="vs-cardProducts-info">
        <div className="vs-cardProducts-description">{description}</div>
        <h4 className="vs-cardProducts-price">${price}</h4>
        <div className="vs-cardProducts-seller"><span>By</span>{sellerName}</div>
        <div className="vs-cardProducts-shipping">{shipments}</div>
      </div>
    </div>
  );
};

export default CardProducts;