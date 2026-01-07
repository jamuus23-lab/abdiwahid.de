# abdiwahid-transit (monorepo)

This workspace contains a minimal backend and frontend starter for building real-time transit departures using public wrappers like transport.rest and (optionally) 9292.

Folders

- `backend/` — Node + Express proxy server that talks to transport.rest and exposes simple API endpoints.
- `frontend/` — Vite + React app that calls the backend to search stations and show departures.

Quick start (development)

1. Backend

```bash
cd backend
npm install
npm start
```

2. Frontend (in a separate terminal)

```bash
cd frontend
npm install
npm run dev
```

Open the frontend dev server (usually http://localhost:5173). The frontend will call the backend at http://localhost:3000 by default.

Notes about APIs and keys

- transport.rest: used in the backend and works without a developer key for many providers. It is a good way to prototype real-time data.
- 9292 / NS: may require registration and API keys for production use. Do not hardcode keys in the repo — set them in environment variables (see `backend/.env.example` if present).

Publishing to GitHub (quick commands)

1. Create a repository on GitHub named `abdiwahid.de` under your account `jamuus23-lab` (if you haven't already).

2. From the root of this project, run these commands to create a local git repo, add files, add the remote, and push:

```bash
cd /Users/jamuus/abdiwahid-transit
git init
git add .
git commit -m "Initial commit: backend + frontend starter"
git branch -M main
git remote add origin https://github.com/jamuus23-lab/abdiwahid.de.git
git push -u origin main
```

Note: If you already have a git repository locally, skip the `git init` and first commit steps. If you prefer to use SSH, replace the remote URL with the SSH form: `git@github.com:jamuus23-lab/abdiwahid.de.git`.

