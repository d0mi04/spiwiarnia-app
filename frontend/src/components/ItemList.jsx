import React from "react";
import ItemCard from "./ItemCard";
import "./ItemList.css";

const ItemList = ({ items }) => {
    // for rendering items list:
    return (
        <div className="item-grid">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;