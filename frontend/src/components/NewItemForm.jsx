import React, { useState} from 'react';
import './NewItemForm.css';

const NewItemForm = ({ onItemAdded }) => {
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

        // creating payload with conversion for numeric fields: 
        const payload = {
            ...formData,
            quantity: Number(formData.quantity),
            alcoholPercentage: Number(formData.alcoholPercentage)
        };

        try {
            const response = await fetch(`/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

            onItemAdded();
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div className='new-item-form-container'>
            {formData.category && (
                <div className='form-image-container'>
                    <img 
                        src='/images/beer-image.jpg'
                        alt='Beer Image'
                        className='form-header-image'
                    />
                </div>
            )}
            <div className='form-content'>
                <h2>Add New Item</h2>
                <form onSubmit={handleSubmit} className='new-item-form'>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='Category e.g. Piwo'
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder='Brand e.g. Somersby'
                        required
                    />
                    <input
                        type="text"
                        name="flavour"
                        value={formData.flavour}
                        onChange={handleChange}
                        placeholder='Flavour e.g. Blackberry'
                        required
                    />
                    <input
                        type="text"
                        name="container"
                        value={formData.container}
                        onChange={handleChange}
                        placeholder='Container e.g. butelka'
                        required
                    />
                    <input
                        type="text"
                        name="alcoholPercentage"
                        value={formData.alcoholPercentage}
                        onChange={handleChange}
                        placeholder='Alkohol % e.g. 4.5'
                        required
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder='Quantity e.g. 4'
                        required
                    />
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder='Type (optional) e.g. semi-dry'
                    />
                    <button type="submit">Add Item</button>
                </form>

                {message && <p className='success-msg'>{message}</p>}
                {error && <p className='eror-msg'>{error}</p>}
            </div>
        </div>
    );
};

export default NewItemForm;