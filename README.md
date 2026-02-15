# Contact Management Feature (Full Stack Assessment)

A full-stack "Saved Contacts" implementation using:
- React + TypeScript + Tailwind CSS
- TanStack Query + React Hook Form + Zod
- Express.js + PostgreSQL + Drizzle ORM + Zod

## Features

- View saved contacts in a responsive table/card layout
- Search contacts by name or company
- Add a new contact from a validated modal form
- Delete contacts with confirmation dialog
- Server-side pagination support
- Loading, error, and success feedback (toasts)
- Scalable backend structure (router/controller/service/repository)

## Project Structure

- `server/` Express API + Drizzle ORM
- `client/` React frontend

## Quick Start

### 1. Start PostgreSQL locally

Make sure PostgreSQL is installed and running on your machine, then create the database:

```bash
createdb contacts_app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 4. Push schema to the database

```bash
npm run db:push --workspace server
```

### 5. Run both apps

```bash
npm run dev
```

- API: `http://localhost:4000`
- Client: `http://localhost:5173`

## API Endpoints

### `GET /api/contacts`
Query params:
- `search` (optional): filters by `name` or `company`
- `page` (optional, default `1`)
- `pageSize` (optional, default `10`, max `50`)

Response:
- `items`: contacts array
- `meta`: pagination metadata

### `POST /api/contacts`
Body:
- `name` (required)
- `email` (optional, valid email)
- `phone` (optional)
- `company` (optional)

### `DELETE /api/contacts/:id`
Deletes a contact by id.

## Assumptions

- PostgreSQL is installed and running locally with credentials matching `server/.env`.
- Search is case-insensitive and performed server-side against `name` and `company`.
- Pagination is server-side for scalability on larger datasets.
- Optional fields can be empty strings in the UI and are normalized to `null/undefined` before persistence.

## Notes

- Drizzle schema is defined in `server/src/db/schema.ts` and synced via `drizzle-kit push`.
- API enforces validation with Zod for query params, route params, and request body.
