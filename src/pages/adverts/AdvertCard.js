// AdvertCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdvertCard.css';
import placeholderImage from '../../assets/placeholderimage.jpg';

const AdvertCard = ({ advert }) => {
  return (
    <Link to={`/adverts/${advert.id}`} className="advert-card-link">
      <div className="advert-card">
        <img src={advert.photo || placeholderImage} alt={advert.name} className="advert-photo" />
        <div className="advert-details">
          <h3 className="advert-name">{advert.name}</h3>
          <p className="advert-price">{advert.price} EUR</p>
          <p className="advert-type">{advert.sale ? 'Venta' : 'Compra'}</p>
          <div className="advert-tags">{advert.tags.join(', ')}</div>
        </div>
      </div>
    </Link>
  );
};

export default AdvertCard;

