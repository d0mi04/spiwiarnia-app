import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function ItemList() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        brand: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchItems = () => {
        setLoading(true);

        const query = new URLSearchParams();

        if (filters.category) query.append('category', filters.category);
        if (filters.brand) query.append('brand', filters.brand);

        fetch(`/items?${query.toString()}`)
            .then(res => res.json())
            .then(data => {
                setItems(data.items);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch items:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchItems();
    };

    return (
        <div style={{ padding: '1rem' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem'}}>
                <label>
                    Category:{' '}
                    <input
                        type="text"
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        placeholder="e.g. beer"
                    />
                </label>{' '}
                <label>
                    Brand:{' '}
                    <input 
                        type="text"
                        name="brand"
                        value={filters.brand}
                        onChange={handleChange}
                        placeholder="e.g. Somersby"
                    />
                </label>{' '}
                <button type="submit">Filter</button>
            </form>

            {loading ? (
                <p>Loading items...</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {items.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ItemList;