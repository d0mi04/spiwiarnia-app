import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import ItemList from "../components/ItemList";
import NewItemForm from "../components/NewItemForm";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        brand: ""
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const fetchItems = () => {
        setLoading(true);

        const query = new URLSearchParams();
        if(filters.category) query.append("category", filters.category);
        if(filters.brand) query.append("brand", filters.brand);

        const queryString = query.toString();
        const url = `/items${queryString ? `?${queryString}` : ""}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.items);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch items:", err);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitFilters = (e) => {
        e.preventDefault();
        fetchItems();
    };

    const handleItemAdded = () => {
        setIsModalOpen(false);
        setMessage("Added to the list!");
        fetchItems();

        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="items-page">
            <div className="item-list-header">
                <h1>Inventory</h1>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    + Add New Item
                </button>
            </div>

            <form>
                <label>
                    Category:{' '}
                    <input
                        type="text"
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        placeholder="e.g. piwo"
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

            {message && <p className="success-message">{message}</p>}

            {loading ? (
                <p>Loading items...</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ItemList items={items} />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewItemForm onItemAdded={handleItemAdded} />
            </Modal>
        </div>
    );
};

export default ItemsPage;