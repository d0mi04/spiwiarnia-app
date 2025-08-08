## Użycie PWA (Progressive Web Application)
 - aplikacja React z wykorzystaniem JSX, komponentów, styli, działająca na urządzeniu mobilnym przez przeglądarkę
 - plan jest: zainstalowanie aplikacji na ekranie startowym telefonu
 - konfiguracja `manifest.json`, `Service Worker`
 - czy będzie działać dla uzytkowników współdzielących zasoby?
 - opcją jest też natywna aplikacja mobilna `React Native` ale wymaga większej ilości zmian (np `View` zamiast `div`, `Text` zamiast `p`), inne uzycie HTML i CSS, ale można ją opublikować w Google Play

## uruchomienie aplikacji na telefonie z androidem:
1. W terminalu w katalogu projektu React `frontend/`:
```bash
npm run start --host
```
to sprawia, że dev-server będzie dostępny poza localhostem.

2. sprawdzenie adresu IP komputera:
**Windows**: w terminalu `ipconfig`, adres IP znajduje się w `IPv4 Address`, np. `192.168.0.12`.

3. W telefonie należy wejść pod adres:
```
http://192.168.0.12:3000
```
czyli `IPv4 Address`:`PORT na którym działa frontend`.
Adres IP + port tworzy `dev-server`.

4. Dodanie do ekranu startowego:
 - otworzenie w przeglądarce Chrome
 - kliknięcie 3 kropek w prawym górnym rogu
 - wybranie `dodaj do ekranu głównego`
 - nalezy mieć w ustawieniach telefonu wyłączoną opcję `zablokuj układ ekr. startowego`

5. skrypt `dev:mobile`:
 - w pliku `package.json`:
 ```json
 "scripts": {
  "start": "react-scripts start",
  "dev:mobile": "cross-env HOST=0.0.0.0 react-scripts start",
  ...
}
```
W systemie Windows należy uzyć biblioteki `cross-env`, żeby ustawić zmienną środowiskową `HOST`.
w katalogu `frontend/`:
```bash
npm install --save-dev cross-env
```
