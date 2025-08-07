import React from 'react';
import './App.css';
import ItemList from './components/ItemList';
import NewItemForm from './components/NewItemForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spiwiarnia 🍻</h1>
        <p>Inventory of your drinks</p>
      </header>
      <main>
        <NewItemForm />
        <ItemList />
      </main>
    </div>
  );
}

export default App;
