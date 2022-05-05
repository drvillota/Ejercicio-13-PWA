import React from 'react';
import './Card.scss';

export const Card = (props) => {
  const { name, url, comics} = props;
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img src={url} className='card-img-top' alt={name} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'># comics availables: {comics}</p>
      </div>
    </div>
  );
};
