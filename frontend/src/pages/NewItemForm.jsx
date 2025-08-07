import React, { useState} from 'react';

const NewItemForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        flavour: '',
        container: '',
        alcoholPercentage: '',
        quantity: '',
        type: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(!response.ok) {
                throw new Error('Failed to add item!');
            }

            setMessage('Item added successfully!');
            setError('');
            setFormData({
                category: '',
                brand: '',
                flavour: '',
                container: '',
                alcoholPercentage: '',
                quantity: '',
                type: ''
            });
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Flavour:
                    <input
                        type="text"
                        name="flavour"
                        value={formData.flavour}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Container:
                    <input
                        type="text"
                        name="container"
                        value={formData.container}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Alcohol %:
                    <input
                        type="text"
                        name="alcoholPercentage"
                        value={formData.alcoholPercentage}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Quantity:
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </label><br />
                <label>
                    Type (optional):
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </label><br />

                <button type="submit">Add Item</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default NewItemForm;