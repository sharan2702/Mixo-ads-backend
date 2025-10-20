# Mixo Ads Backend

## Overview
This backend simulates ad-platform integrations and uses OpenAI to generate ad copy.  
It provides the following endpoints:

1. `POST /connect-account` — Connect an ad account (simulated OAuth)  
2. `POST /create-campaign` — Create a campaign with idempotency + token simulation  
3. `POST /generate-ad-copy` — Generate ad copy using OpenAI  
4. `POST /batch-create-ads` — Batch creation of ads with idempotency and rate-limiting  
5. `GET /fetch-analytics` — Return mock analytics metrics  

---

## Requirements
- Node.js v18+  
- npm  
- OpenAI API key  

---

## Setup & Run

### 1. Clone the repo
```bash
git clone <repo-link>
cd mixo-ads-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file (based on `.env.example`)

```env
OPENAI_API_KEY=your_openai_key_here
PORT=3000
```

### 4. Start the server

```bash
npm start
# or for auto-reload during development
npx nodemon server.js
```

Server will run on:

```
http://localhost:3000
```

---

## Docker Run

### 1. Build Docker image

```bash
docker build -t mixo-ads-backend .
```

### 2. Run Docker container

```bash
docker run -p 3000:3000 --env-file .env mixo-ads-backend
```

* The server will now be accessible on `http://localhost:3000` inside the container.

---

## Postman

* Import the included Postman collection `.json` to test all endpoints.
* Example requests included for all 5 endpoints.
* Use `{{OPENAI_API_KEY}}` as a placeholder in Postman for your key.

---

## Tests

* Run unit tests:

```bash
npm test
```

---

## Implementation Notes

* All routes are modular and under `routes/`
* `in-memory Maps` used for storage (idempotency, campaigns, ads)
* Simulated OAuth tokens and rate limiting
* OpenAI integration for ad copy generation with retries
* Logging included for all critical actions
* Designed for assignment scoring: core correctness, idempotency, token handling, OpenAI use


