# Shield Cars Ltd

A full-stack luxury car dealership website and admin dashboard.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 (plain JavaScript / JSX)
- **Backend:** Node.js + Express 5 + MongoDB (Mongoose), JWT authentication
- In production the Express server also serves the built frontend, so the whole app runs as a single service.

## Project structure

```
backend/    Express API, MongoDB models, JWT auth, and the production server
frontend/   React SPA (built into frontend/dist and served by the backend)
```

## Prerequisites

- Node.js 20+ (tested on 22)
- A MongoDB database — local (`mongodb://127.0.0.1:27017/shieldcars`) or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

## Setup

### 1. Configure the backend

Create `backend/.env` (`backend/.env` is gitignored and never committed).

Set your Atlas credentials (the connection string is built automatically for
`cluster0.jahwpeg.mongodb.net`):

```env
MONGO_USER=your_atlas_db_user
MONGO_PASSWORD=your_atlas_db_password
JWT_SECRET=some_long_random_string
ADMIN_EMAIL=admin@shieldcars.co.uk
ADMIN_PASSWORD=change_me
```

To use a local MongoDB instead, leave `MONGO_USER`/`MONGO_PASSWORD` empty and set
`MONGO_URI=mongodb://127.0.0.1:27017/shieldcars`. To target another cluster, set
`MONGO_CLUSTER` (and optionally `MONGO_DB`). Passwords with special characters are
URL-encoded automatically.

If your network cannot resolve `mongodb.net` (Atlas SRV/TXT lookups hang), enable
DNS-over-HTTPS:

```env
MONGO_DNS_OVER_HTTPS=true
```

This routes DNS through `https://dns.google/resolve` and works on restricted
networks. Alternatively, if plain public DNS works, use
`MONGO_DNS_SERVERS=8.8.8.8,8.8.4.4` instead.

#### Email notifications (optional)

New inquiries are always saved to MongoDB. To also receive an email for each new
inquiry, configure SMTP in `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@gmail.com
SMTP_PASS=your_16_char_app_password
MAIL_FROM="Shield Cars Ltd <you@gmail.com>"
NOTIFY_EMAIL=you@gmail.com
```

- Leave `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` empty to disable email — inquiries are
  still saved and shown in the admin dashboard.
- `NOTIFY_EMAIL` may be a comma-separated list of recipients.
- `MAIL_FROM` defaults to `SMTP_USER` if omitted.
- Port `587` uses STARTTLS (`SMTP_SECURE=false`); use port `465` with
  `SMTP_SECURE=true` for implicit SSL.

**Gmail setup:** an app password is required (your normal password will not work),
and 2-Step Verification must be enabled on the Google account:

1. Enable 2-Step Verification: <https://myaccount.google.com/security>.
2. Create an app password: <https://myaccount.google.com/apppasswords>.
3. Copy the 16-character password and paste it into `SMTP_PASS` **without spaces**.

If you see `535-5.7.8 Username and Password not accepted`, the app password is
wrong/expired or 2-Step Verification is off — regenerate it and try again.

> Tip: sending "as" a `@yourdomain.com` address through a Gmail SMTP will usually
> be rejected or flagged. Use `SMTP_USER` (the Gmail address) as the From, or use
> your domain host's SMTP instead.

### 2. Install dependencies

```bash
npm --prefix backend install
npm --prefix frontend install
```

### 3. Seed the database (admin user + sample vehicles)

```bash
npm --prefix backend run seed
```

This creates the admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` and inserts
the sample inventory. Re-running it resets the inventory and updates the admin.

### 4. Build and run

Run everything as one production server:

```bash
npm --prefix backend run serve
```

This installs/builds the frontend and starts the server. Then open:

- Website: <http://localhost:5000>
- Admin dashboard: <http://localhost:5000/admin> (sign in with the seeded admin)
- Health check: <http://localhost:5000/api/health>

For subsequent runs you can just build once and start:

```bash
npm --prefix backend run build   # builds frontend/dist
npm --prefix backend start       # serves API + frontend on PORT (default 5000)
```

## Development (optional)

Run the backend and frontend with hot reload:

```bash
# terminal 1 — API on http://localhost:5000
npm --prefix backend run dev

# terminal 2 — Vite dev server on http://localhost:3000 (proxies /api to the backend)
npm --prefix frontend run dev
```

The Vite dev server proxies `/api` requests to the backend (see
`frontend/vite.config.js`), so no CORS configuration is needed in development.

## API overview

| Method | Route                       | Auth  | Description                       |
| ------ | --------------------------- | ----- | --------------------------------- |
| GET    | `/api/health`               | –     | Service + database status         |
| POST   | `/api/auth/login`           | –     | Admin login, returns a JWT        |
| GET    | `/api/cars`                 | –     | List/filter vehicles              |
| GET    | `/api/cars/:id`             | –     | Get one vehicle (by id or stock)  |
| POST   | `/api/cars`                 | Admin | Create a vehicle                  |
| PUT    | `/api/cars/:id`             | Admin | Update a vehicle                  |
| DELETE | `/api/cars/:id`             | Admin | Delete a vehicle                  |
| POST   | `/api/inquiries`            | –     | Submit an inquiry (+ emails staff) |
| GET    | `/api/inquiries`            | Admin | List inquiries (newest first)     |
| PATCH  | `/api/inquiries/:id/status` | Admin | Update inquiry status             |
| DELETE | `/api/inquiries/:id`        | Admin | Delete an inquiry                 |

Admin requests require an `Authorization: Bearer <token>` header (handled
automatically by the frontend after login).

## Deployment

1. Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `PORT`
   (optional) in the environment.
2. Build the frontend: `npm --prefix backend run build`.
3. Seed once: `npm --prefix backend run seed`.
4. Start: `npm --prefix backend start` (or `npm --prefix backend run serve`).

The server serves the SPA with history fallback and long-cache headers for
hashed assets, so any host that runs a Node process (Render, Railway, Fly.io,
a VPS, etc.) can serve the whole app.
