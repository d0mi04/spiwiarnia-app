```less
src/
├── App.js               // Główna aplikacja, router i layout
├── index.js             // Punkt wejściowy
├── components/          // Małe, wielorazowe komponenty UI
│   ├── Navbar.jsx
│   ├── ItemCard.jsx
│   └── ...
├── pages/               // Całe widoki, odpowiadające routom
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── InventoryPage.jsx
│   ├── AddItemPage.jsx
│   └── ...
├── services/            // Logika API, np. fetch do backendu
│   └── api.jsx
├── context/             // Zarządzanie globalnym stanem (np. user)
│   └── AuthContext.jsx
├── hooks/               // Własne hooki (opcjonalnie)
├── assets/              // Obrazy, ikony, style
└── styles/              // Pliki CSS lub Tailwind setup
```