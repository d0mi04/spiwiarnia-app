import React from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
    return (
        <div className="item-card">
            <h3>{item.category}</h3>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Flavour:</strong> {item.flavour}</p>
            <p><strong>Alcohol:</strong> {item.alcoholPercentage}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Container:</strong> {item.container}</p>
            {item.type && <p><strong>Type:</strong> {item.type}</p>}
        </div>
    );
}

export default ItemCard;