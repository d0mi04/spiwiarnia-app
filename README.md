# 📄 Project: Spiwiarnia

---

## 🧠 1. Część Biznesowa

### ❗ 1.1 Nazwa aplikacji
**SPIWIARNIA** - PIWO + SPIŻARNIA

### 💡 1.2 Problem, który aplikacja rozwiązuje
Aplikacja ułatwia zarządzanie zapasami spożywczymi (piwo) i w przyszłości innymi produktami przechowywanymi w domowej "spiżarni". Użytkownicy mogą sprawdzić co mają, co się kończy, co trzeba dokupić – bez potrzeby zaglądania fizycznie do szafek.

### 👪 1.3 Grupa docelowa
Grupa znajomych (pełnoletni), którzy wspólnie zarządzają zapasami w ramach gospodarstwa domowego lub niezależnie, ale chcą mieć podgląd do zapasów i dzielić się nimi.

### ⚙️ 1.4 Kluczowe funkcje aplikacji
- Rejestracja / logowanie użytkownika
- Przeglądanie zapasów (dla zalogowanego użytkownika)
- Dodawanie nowych zapasów
- Edycja / usuwanie zapasów
- Filtrowanie / sortowanie zapasów (np. po dacie ważności, typie produktu)
- Przypomnienia o kończących się zapasach (w przyszłości)

### ✅ 1.5 MVP – Minimum Viable Product
- Logowanie i rejestracja użytkownika
- Przeglądanie, dodawanie i usuwanie zapasów
- Dane przechowywane w `MongoDB`
- Testowanie lokalne przez `Postman`

### 📈 1.6 Możliwości rozwoju (wersja 2.0+)
- PWA (Progressive Web App)
- Aplikacja desktopowa (Electron / Tauri)
- Aplikacja mobilna (React Native / Capacitor)
- Powiadomienia push / e-mail
- Współdzielenie zapasów między użytkownikami

---

## 💻 2. Część Deweloperska

### 🛠️ 2.1 Stos technologiczny
- **Frontend**: JavaScript, a na późniejszym etapie – React
- **Backend**: Node.js + Express
- **Baza danych**: MongoDB Atlas
- **Testowanie API**: Postman
- **Autentykacja**: JWT (JSON Web Token)
- **Środowisko uruchomieniowe**: lokalnie (dev), docelowo przeglądarka, desktop, mobile

### 📄 2.2 Struktura API (REST)
- `POST /v1/register` – rejestracja
- `POST /v1/login` – logowanie
- `GET /v1/items` – pobierz zapasy
- `POST /v1/items` – dodaj zapas
- `PUT /v1/items/:id` – edytuj zapas
- `DELETE /v1/items/:id` – usuń zapas

### 📋 2.3 Model danych (MongoDB – przykładowy dokument Piwo 🍻)
```json
{
  "_id": "...",
  "producer": "Somersby",
  "taste": "Blackberry",
  "quantity": "3",
  "category": "piwo procentowe", // piwo zero
  "addedBy": "...", // ref: 'User'
  "createdAt": "..."
}
```

### 🔒 2.4 Bezpieczeństwo
- JWT do autoryzacji
- Szyfrowanie haseł (bcrypt)
- Walidacja danych

### 🍀 2.5 Środowiska
- Dev: lokalnie (Node, Postman)
- Produkcja: w przyszłości Vercel/Netlify (frontend), Render/Heroku (backend), MongoDB Atlas (baza)

---

## 📲 3. Docelowe formy aplikacji
- ✅ Aplikacja przeglądarkowa (PWA)
- ✅ Aplikacja desktopowa (Electron / Tauri)
- ✅ Aplikacja mobilna (React Native / Capacitor)

---

## 🧪 4. Testowanie
- Testy ręczne w Postmanie
- (Opcjonalnie) testy jednostkowe backendu (Mocha + Chai)
- Testy UI (w przyszłości – Cypress)

---

## 🧱 5. Planowanie pracy
- TODO lista zadań (Trello / GitHub Projects)
- Milestones:
  - MVP API
  - Frontend przeglądarkowy
  - PWA / aplikacja instalowalna

## 👩‍💻 Autor:
d0mi04, https://github.com/d0mi04

---
Made with 💖 in JavaScript