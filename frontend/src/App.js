import React from 'react';
import './App.css';
import ItemsPage from './pages/ItemsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spiwiarnia 🍻</h1>
        <p>Inventory of your drinks</p>
      </header>
      <main>
        <ItemsPage />
      </main>
    </div>
  );
}

export default App;
