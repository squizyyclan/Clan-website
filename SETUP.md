# OPSucht Clan Website - Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (lokal oder Atlas)
- npm oder yarn

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

Erstelle eine `.env` Datei:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/opsocht-clan
JWT_SECRET=dein_geheimes_schluessel_hier
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Starten:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Die App öffnet sich unter `http://localhost:3000`

## Features

### ✅ Benutzer-System
- Registrierung mit Email & Password
- Sichere JWT Authentication
- Admin/User Rollen

### ✅ Spieler-Management
- Spieler nur mit Minecraft-Username registrieren
- Admin genehmigt Spieler manuell
- Genehmigungsliste im Admin-Panel

### ✅ Admin Panel
- Übersicht aller Spieler
- Pending Approvals anzeigen
- Spieler genehmigen oder ablehnen
- Dashboard mit Statistiken

## API Endpoints

### Auth
- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Aktuellen User abrufen

### Players
- `POST /api/players` - Spielerprofil erstellen
- `GET /api/players` - Alle genehmigten Spieler
- `GET /api/players/:id` - Einzelnen Spieler abrufen

### Admin
- `GET /api/admin/players/pending` - Ausstehende Spieler
- `POST /api/admin/players/:id/approve` - Spieler genehmigen
- `POST /api/admin/players/:id/reject` - Spieler ablehnen
- `GET /api/admin/users` - Alle Benutzer
- `GET /api/admin/stats` - Statistiken

## Minecraft Spielerkopf Integration

Um die Spielerköpfe zu integrieren, kann die Minecraft API verwendet werden:

```javascript
// Spielerkopf-URL:
https://crafatar.com/avatars/{minecraftUUID}?size=64

// Beispiel:
<img src="https://crafatar.com/avatars/12345-67890-abcdef" />
```

Die UUID kann via:
```
https://api.mojang.com/users/profiles/minecraft/{username}
```

abgerufen werden.

## Ablauf für Clan-Beitritte

1. **Benutzer registriert sich** mit Username, Email, Passwort
2. **Benutzer gibt Minecraft-Namen ein** im Dashboard
3. **Admin-Panel zeigt ausstehende Spieler** an
4. **Admin genehmigt oder lehnt ab**
5. **Genehmigter Spieler erscheint in der Clan-Spielerliste**

## Troubleshooting

### MongoDB Verbindung fehlgeschlagen
```bash
# MongoDB Service starten
mongod
```

### Port 5000 bereits in Verwendung
```bash
# Backend auf anderem Port starten
PORT=5001 npm run dev
```

### CORS Fehler
Stelle sicher, dass `FRONTEND_URL` in `.env` korrekt gesetzt ist.
