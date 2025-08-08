## App.jsx - główna aplikacja
 - definicja routingu
 - wspólny layout (`Navbar`, `Footer`)
 - może być obsługiwany jakiś globalny kontekst - to plan na v2.0, bo tutaj dojdzie wtedy `AuthProvider`

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import AddItemPage from './pages/AddItemPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/add" element={<AddItemPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
```

## components/ - małe powtarzalne elementy
 - `ItemCard.jsx` - karta pojedynczego produktu
 - `Navbar.jsx` - pasek nawigacyjny
 - `ItemForm.jsx` - formularz dodawania/edycji

```jsx
function ItemCard({ item }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>Ilość: {item.quantity}</p>
    </div>
  );
}
```
## pages/ - pełne widoki
- katalog ma zawierać pełne strony, które są osobnymi routami

`Inventory.jsx`:
```jsx
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { getItems } from '../services/api';

function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return (
    <div>
      <h1>Twoje zapasy</h1>
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
```

## services/ - komunikacja z backendem

`api.jsx`:
```jsx
const API_BASE = 'http://localhost:3000'; // lub env

export async function getItems() {
  const res = await fetch(`${API_BASE}/items`);
  return await res.json();
}
```

## context/ - globalny stan, np. użytkownik

`AuthContext.jsx` - do przechowywania zalogowanego użytkownika
```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```
w komponentach - `useAuth()`.
