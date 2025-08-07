import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function ItemList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data => {
                setItems(data.items);
                setLoading(false);
            })
            .catch (err => {
                console.error('Failed to fetch items:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading items...</p>;
    if(items.length === 0) return <p>No items found.</p>

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {items.map(item => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
}

export default ItemList;