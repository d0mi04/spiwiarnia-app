import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item }) => {
    const {
        category, 
        brand,
        flavour,
        container,
        alcoholPercentage,
        quantity,
        type
    } = item;

    return (
        <div className='item-card'>
            <h3>{category}</h3>
            <img 
                src="/images/beer-image.jpg"
                alt={`${brand} ${flavour}`}
                className='item-image'
            />
            <div className='item-details'>
                <p className='item-brand'><strong>Brand:</strong> {brand}</p>
                <p className='item-flavour'><strong>Flavour:</strong> {flavour}</p>
                <p className='item-alcohol'><strong>Alcohol:</strong> {alcoholPercentage}</p>
                <p className='item-quantity'><strong>Quantity:</strong> {quantity}</p>
                <p className='item-container'><strong>Container:</strong> {container}</p>
                {type && <p className='item-type'><strong>Type:</strong> {type}</p>}
            </div>
        </div>
    );
};

export default ItemCard;