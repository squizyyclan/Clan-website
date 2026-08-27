# OPSucht Clan Website

Eine Full-Stack Webanwendung für das OPSucht Minecraft-Clan Management mit Login, Registrierung und Admin-Panel.

## Features

- 👥 **User Authentication** - Sichere Login/Registrierung
- 🛡️ **Admin Panel** - Genehmigung von Spielern und Inhalten
- ⛏️ **Spieler-Management** - Spielerköpfe und Profile
- 📋 **Approval System** - Admin-Genehmigung für neue Spieler
- 🎨 **Responsive Design** - Optimiert für Desktop und Mobile

## Tech Stack

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Bcrypt für Password Hashing

### Frontend
- React 18+
- TypeScript
- React Router
- Tailwind CSS

## Installation

```bash
# Clone repository
git clone <repo-url>
cd Clan-website

# Backend Setup
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend Setup (in neuem Terminal)
cd frontend
npm install
npm start
```

## Umgebungsvariablen

Siehe `.env.example` Dateien in backend/ und frontend/ Ordnern.

## Struktur

```
Clan-website/
├── backend/          # Express API
├── frontend/         # React App
├── docs/             # Dokumentation
└── README.md
```

## Lizenz

MIT
