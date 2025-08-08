import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import ItemCard from "./ItemCard";
import "./ItemList.css";
import NewItemForm from "../pages/NewItemForm";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchItems = () => {
        setLoading(true);

        const query = new URLSearchParams();

        if (filters.category) query.append("category", filters.category);
        if (filters.brand) query.append("brand", filters.brand);

        fetch(`/items?${query.toString()}`)
            .then(res => res.json())
            .then(data => {
                setItems(data.items);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch items:", err);
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
        <div className="item-list-container">
            <div className="item-list-header">
                <h1>Inventory</h1>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    + Add New Item
                </button>
            </div>

            <form onSubmit={handleSubmit} className="filter-form">
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
                <div className="item-grid">
                    {items.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewItemForm />
            </Modal>
        </div>
    );
}

export default ItemList;