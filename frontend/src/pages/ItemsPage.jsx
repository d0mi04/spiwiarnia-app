import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import ItemList from "../components/ItemList";
import NewItemForm from "../components/NewItemForm";
import Pagination from "../components/Pagination";
import "./ItemsPage.css";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        flavour: ""
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); // default
    const [totalPages, setTotalPages] = useState(1);

    const fetchItems = () => {
        setLoading(true);

        // building a query:
        const query = new URLSearchParams();
        if(filters.category) query.append("category", filters.category);
        if(filters.brand) query.append("brand", filters.brand);
        if(filters.flavour) query.append("flavour", filters.flavour);

        query.append("page", page);
        query.append("limit", limit);

        const queryString = query.toString();
        const url = `/items${queryString ? `?${queryString}` : ""}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.items);
                setTotalPages(data.totalPages); // backend is returning this information
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch items:", err);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchItems();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, filters, limit]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitFilters = (e) => {
        e.preventDefault();
        setPage(1); // afteru using filters needs to go back to page 1
    };

    const handleItemAdded = () => {
        setIsModalOpen(false);
        setMessage("Added to the list!");
        fetchItems();

        setTimeout(() => setMessage(""), 3000);
    };

    const handleIncrement = async (id) => {
        try {
            const res = await fetch(`/items/${id}/increment`, {
                method: 'PATCH'
            });

            if(!res.ok) throw new Error("Failed to increment item.");
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDecrement = async (id) => {
        try {
            const res = await fetch(`/items/${id}/decrement`, {
                method: 'PATCH'
            });

            if(!res.ok) throw new Error("Failed to decrement item.");
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="items-page">
            <div className="item-list-header">
                <h1>Inventory</h1>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                    + Add New Item
                </button>
            </div>

            <form onSubmit={handleSubmitFilters} className="filter-form">
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
                <label>
                    Flavour:{' '}
                    <input
                        type="text"
                        name="flavour"
                        value={filters.flavour}
                        onChange={handleChange}
                        placeholder="e.g. wiśnia"
                    />
                </label>{' '}
                <label>
                    Items per page:{' '}
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1); // after limit change, go back to 1. page
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>{' '}
                <button type="submit">Filter</button>
            </form>

            {message && <p className="success-message">{message}</p>}

            {loading ? (
                <p>Loading items...</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <>
                    <ItemList 
                        items={items} 
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewItemForm onItemAdded={handleItemAdded} />
            </Modal>
        </div>
    );
};

export default ItemsPage;