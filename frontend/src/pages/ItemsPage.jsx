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

    // sorting:
    const [sortBy, setSortBy] = useState("category"); // default sorting by category  
    const [sortOrder, setSortOrder] = useState("asc"); // default ascending

    const fetchItems = () => {
        setLoading(true);

        // building a query:
        const query = new URLSearchParams();
        if(filters.category) query.append("category", filters.category);
        if(filters.brand) query.append("brand", filters.brand);
        if(filters.flavour) query.append("flavour", filters.flavour);

        query.append("page", page);
        query.append("limit", limit);

        query.append("sortBy", sortBy);
        query.append("order", sortOrder);

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
        // window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, filters, limit, sortBy, sortOrder]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitFilters = (e) => {
        e.preventDefault();
        setPage(1); // after using filters needs to go back to page 1
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
            const data = await res.json();

            setItems((prevItems) => {
                const updatedItems = prevItems.map((item) =>
                    item._id === id ? { ...item, ...data.item} : item
                );

                return [...updatedItems].sort((a, b) => {
                    let valA = a[sortBy];
                    let valB = b[sortBy];

                    if(typeof valA === 'string') valA = valA.toLowerCase();
                    if(typeof valB === 'string') valB = valB.toLowerCase();

                    if(valA < valB) return sortOrder === 'asc' ? -1 : 1;
                    if(valA > valB) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            });
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
            const data = await res.json();

            if(data.item) {
                setItems((prevItems) => {
                const updatedItems = prevItems.map((item) =>
                    item._id === id ? { ...item, ...data.item} : item
                );

                return [...updatedItems].sort((a, b) => {
                    let valA = a[sortBy];
                    let valB = b[sortBy];

                    if(typeof valA === 'string') valA = valA.toLowerCase();
                    if(typeof valB === 'string') valB = valB.toLowerCase();

                    if(valA < valB) return sortOrder === 'asc' ? -1 : 1;
                    if(valA > valB) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            });
            } else {
                setItems((prevItems) =>
                    prevItems.filter((item) => item._id !== id)
                );
            }
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
                <input
                    type="text"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    placeholder="Category e.g. piwo"
                />
                <input
                    type="text"
                    name="brand"
                    value={filters.brand}
                    onChange={handleChange}
                    placeholder="Brand e.g. Somersby"
                />
                <input
                    type="text"
                    name="flavour"
                    value={filters.flavour}
                    onChange={handleChange}
                    placeholder="Flavour e.g. wiśnia"
                />

                {/* sorting: */}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="quantity">Sort by Quantity</option>
                    <option value="brand">Sort by Brand</option>
                    <option value="category">Sort by Category</option>
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <label>
                    Items per page:{' '}
                    <div className="select-wrapper">
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
                    </div>
                    
                </label>{' '}
                <button type="submit" className="filter-button">Filter</button>
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