# abdiwahid-transit-backend

Minimal Node ESM server for the abdiwahid transit backend.

How to run
```
# from the backend folder
npm install
npm start
```

Available proxy endpoints (examples)

- Search stations (transport.rest):
	GET /api/transport/station?query=Amsterdam

- Departures for a stop (transport.rest):
	GET /api/transport/departures?stopId=<stop_id>&duration=30

- 9292 departures (requires configuration):
	GET /api/9292/departures?stopId=<stop_id>
	If you have a 9292 API key, set it in the environment as `9292_API_KEY` or `API_9292_KEY`.

Notes
- The backend proxies external transit APIs (transport.rest). transport.rest provides a free wrapper that can be used without an API key for many providers. For 9292 or NS you may need to register and provide API keys.
- Respect terms of service, rate limits, and usage rules for each API. The server includes a simple rate limiter to reduce accidental abuse.
 
Environment / API keys

1. Copy `backend/.env.example` to `backend/.env` (do not commit `.env`):

```bash
cp backend/.env.example backend/.env
```

2. Edit `backend/.env` and fill in your keys. Example using the shell (macOS zsh):

```bash
echo "9292_API_KEY=jamuus23-lab_" >> backend/.env
```

3. Install `dotenv` (optional) if you don't already have it. The backend uses `dotenv/config` when present. From the backend folder:

```bash
cd backend
npm install dotenv
```

Now start the backend as usual:

```bash
npm start
```


