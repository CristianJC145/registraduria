import React from "react";
import styled from "styled-components";
import LazyImage from "../../../shared/components/LazyImage";
import { Link } from "react-router-dom";

interface CardProps {
  imageSrc: string;
  description: string;
  price: string;
  sellerName: string;
  shippingPrice: string;
  url: {
    pathname: string;
    state: {};
  };
}

const CardProducts: React.FC<CardProps> = ({
  imageSrc,
  description,
  price,
  sellerName,
  shippingPrice,
  url,
}) => {
  const shipments =
    shippingPrice == "Gratis" || 0 ? `Envío Gratis` : `Envío $${shippingPrice}`;
  const dataProduct = url.state;
  const pathName = url.pathname;

  return (
    <CardProductStyles>
      <Link to={pathName} state={dataProduct} className="vs-cardProducts">
        <div className="vs-cardProducts-content-image">
          <LazyImage
            src={imageSrc}
            alt="Product"
            className="vs-cardProducts-image"
          />
        </div>
        <div className="vs-cardProducts-info">
          <div className="vs-cardProducts-description">{description}</div>
          <h4 className="vs-cardProducts-price">${price}</h4>
          <div className="vs-cardProducts-seller">
            <span>By</span>
            {sellerName}
          </div>
          <div className="vs-cardProducts-shipping">{shipments}</div>
        </div>
      </Link>
    </CardProductStyles>
  );
};

export default CardProducts;

const CardProductStyles = styled.div`
  .vs-cardProducts {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-body);
    box-shadow: 0 0 3px 0 rgba(41, 41, 42, 0.02);
    text-decoration: none;
  }
  .vs-cardProducts:hover,
  .vs-cardProducts:focus {
    box-shadow: 1px 4px 12px 0 rgba(41, 41, 42, 0.1);
  }
  .vs-cardProducts-content-image {
    display: flex;
    align-items: center;
    min-height: 150px;
    min-width: 150px;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    flex: 0 1 auto;
    background-color: rgba(var(--color-primary-rgb), 0.02);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  .vs-cardProducts-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
  }

  .vs-cardProducts-info {
    padding: var(--p-1) var(--p-4) var(--p-5);
    margin: 1rem 0;
  }

  .vs-cardProducts-description {
    color: var(--color-gray-900);
    margin-bottom: 0.75rem;
  }

  .vs-cardProducts-price {
    font-weight: bold;
    color: var(--color-gray-900);
  }

  .vs-cardProducts-seller {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: normal;
    color: #f45572;
  }
  .vs-cardProducts-seller span {
    text-transform: none;
    color: rgba(27, 39, 79, 0.95);
    margin-right: 0.5rem;
  }
  .vs-cardProducts-shipping {
    margin-top: 1rem;
    font-weight: 500;
    color: var(--color-pastel-green);
    font-size: 12px;
  }
  @media (min-width: 768px) {
    .vs-cardProducts {
      box-shadow: 0 0 5px 0 rgba(41, 41, 42, 0.02);
    }
    .vs-cardProducts-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @media (min-width: 992px) {
    .vs-cardProducts:hover,
    .vs-cardProducts:focus {
      box-shadow: 1px 4px 14px 0 rgba(41, 41, 42, 0.1);
    }
    .vs-cardProducts-info {
      padding: var(--p-1) var(--p-6) var(--p-5);
    }
    .vs-cardProducts-price {
      line-height: 1.5rem;
    }
    .vs-cardProducts-seller {
      margin: 0.5rem 0;
      font-weight: bold;
      font-size: 13px;
    }

    .vs-cardProducts-shipping {
      font-weight: 600;
      font-size: 13px;
    }
  }
`;
