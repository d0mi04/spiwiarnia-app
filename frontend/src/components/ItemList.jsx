import React from "react";
import ItemCard from "./ItemCard";
import "./ItemList.css";

const ItemList = ({ items, onIncrement, onDecrement }) => {
    // for rendering items list:
    return (
        <div className="item-grid">
            {items.map((item) => (
                <ItemCard 
                    key={item._id} 
                    item={item} 
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            ))}
        </div>
    );
};

export default ItemList;