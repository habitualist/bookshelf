/**
 * BookShelf - A personal book notes tracker
 * Inspired by Derek Sivers' sive.rs/book
 *
 * Main server entry point
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import booksRouter from "./routes/books.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ── View engine (EJS) ──────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use(express.json()); // parse JSON bodies
app.use(express.static(path.join(__dirname, "../frontend/public"))); // static assets

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/", booksRouter);

// ── Global error handler ───────────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`📚 BookShelf running at http://localhost:${PORT}`);
});
