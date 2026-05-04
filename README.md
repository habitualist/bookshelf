# 📚 BookShelf

A personal book-notes web app inspired by [Derek Sivers' book list](https://sive.rs/book).

Track every book you've read, rate it 1–10, write a summary of your key takeaways, and browse your library sorted by rating, recency, or title. Book covers are fetched automatically from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers).

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Server     | Node.js + Express.js    |
| Database   | PostgreSQL (Supabase)   |
| Templates  | EJS                     |
| HTTP client| Axios                   |
| Styling    | Plain CSS               |

---

## Project Structure

```
bookshelf/
├── backend/
│   ├── index.js            # Express app entry point
│   ├── db.js               # PostgreSQL connection pool
│   ├── schema.sql          # DB schema + seed data
│   ├── routes/
│   │   └── books.js        # All CRUD + API routes
│   └── middleware/
│       └── errorHandler.js # Global error handler
├── frontend/
│   ├── views/
│   │   ├── partials/       # header.ejs, footer.ejs
│   │   ├── index.ejs       # Book list (home)
│   │   ├── book.ejs        # Single book detail
│   │   ├── form.ejs        # Add / edit form
│   │   ├── 404.ejs
│   │   └── error.ejs
│   └── public/
│       ├── css/style.css
│       ├── js/main.js
│       └── images/no-cover.svg
├── postman/
│   └── BookShelf.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone & install dependencies

```bash
git clone <your-repo-url>
cd bookshelf
npm install
```

### 2. Set up the database

#### Option A — Supabase (recommended)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and paste the contents of `backend/schema.sql`. Run it.
3. Copy your **connection string** from Project Settings → Database → Connection string (URI mode).

#### Option B — Local PostgreSQL

```bash
createdb bookshelf
psql -U postgres -d bookshelf -f backend/schema.sql
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env and add your DATABASE_URL (or individual DB_* variables)
```

### 4. Run the server

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## API Endpoints

| Method | Path                      | Description                       |
|--------|---------------------------|-----------------------------------|
| GET    | `/`                       | List all books (sortable)         |
| GET    | `/books/new`              | Add-book form                     |
| POST   | `/books`                  | Create a book                     |
| GET    | `/books/:id`              | Single book detail                |
| GET    | `/books/:id/edit`         | Edit form                         |
| POST   | `/books/:id/update`       | Update a book                     |
| POST   | `/books/:id/delete`       | Delete a book                     |
| GET    | `/api/cover/:query`       | Cover lookup (JSON) — ISBN/title  |

### Sort query parameter

Append `?sort=` to the home route:

| Value      | Effect                        |
|------------|-------------------------------|
| `date_read`| Most recently read first (default) |
| `rating`   | Highest rated first           |
| `title`    | Alphabetical A → Z            |

---

## Testing with Postman

1. Open Postman.
2. Click **Import** → select `postman/BookShelf.postman_collection.json`.
3. Set the `baseUrl` collection variable to `http://localhost:3000` (already pre-filled).
4. Run requests in order — create a book first, then copy its `id` into the `bookId` variable.

---

## Open Library Covers API

Book covers are fetched from `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`.  
If no ISBN is provided, the app falls back to Open Library's search API using the book title.  
A local SVG placeholder is shown when no cover is found.

---

## Database Schema

```sql
CREATE TABLE books (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  author      VARCHAR(255) NOT NULL,
  isbn        VARCHAR(20),
  rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 10),
  date_read   DATE,
  summary     TEXT NOT NULL,
  notes       TEXT,
  cover_url   TEXT DEFAULT '/images/no-cover.svg',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## License

MIT — use freely for learning and personal projects.
