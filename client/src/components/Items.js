import React, { useEffect, useState } from 'react';

function Items() {
    const [items, setItems] = useState([]);
    const [randomItem, setRandomItem] = useState(null);
    const [content, setContent] = useState(''); // For adding new items
    const [deleteId, setDeleteId] = useState(''); // For deleting items by ID

    // Fetch items and a random item on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    // Function to fetch items
    const fetchItems = () => {
        fetch('/api/items')
            .then(response => response.json())
            .then(data => {
                setItems(data.items);
                setRandomItem(data.randomItem);
            });
    };

    // Function to add an item
    const addItem = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
        .then(() => {
            fetchItems(); // Refresh items list
            setContent(''); // Clear input field
        });
    };

    // Function to delete an item
    const deleteItem = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteId }),
        })
        .then(() => {
            fetchItems(); // Refresh items list
            setDeleteId(''); // Clear input field
        });
    };

    return (
        <div>
            <h1>Random Item: {randomItem ? randomItem.content : 'No items found'}</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.id}: {item.content}</li>
                ))}
            </ul>
            <form onSubmit={addItem}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add new item"
                />
                <button type="submit">Add Item</button>
            </form>
            <form onSubmit={deleteItem}>
                <input
                    type="number"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    placeholder="ID to delete"
                />
                <button type="submit">Delete Item</button>
            </form>
        </div>
    );
}

export default Items;
