-- schema.sql
-- Run once to set up the BookShelf database.
--
-- Usage:
--   psql -U postgres -d bookshelf -f schema.sql
-- or paste directly into Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS books (
  id          SERIAL        PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  author      VARCHAR(255)  NOT NULL,
  isbn        VARCHAR(20),                          -- optional, used for cover lookups
  rating      SMALLINT      NOT NULL                -- 1-10 scale
                CHECK (rating BETWEEN 1 AND 10),
  date_read   DATE,                                 -- when you finished the book
  summary     TEXT          NOT NULL,               -- your summary / key takeaways
  notes       TEXT,                                 -- optional extra notes
  cover_url   TEXT          DEFAULT '/images/no-cover.svg',
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Index for common sort operations
CREATE INDEX IF NOT EXISTS books_rating_idx    ON books (rating DESC);
CREATE INDEX IF NOT EXISTS books_date_read_idx ON books (date_read DESC);
CREATE INDEX IF NOT EXISTS books_title_idx     ON books (title ASC);

-- Optional: seed a couple of demo rows to verify setup
INSERT INTO books (title, author, isbn, rating, date_read, summary, notes, cover_url)
VALUES
  (
    'How to Win Friends and Influence People',
    'Dale Carnegie',
    '9780671027032',
    9,
    '2024-01-15',
    'A timeless guide to human relations. Carnegie argues that understanding people''s desire to feel important is the master key to dealing with others. Practical advice: show genuine interest, remember names, listen more than you talk, and never criticise directly.',
    'Re-read every year as a reminder.',
    'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg'
  ),
  (
    'Thinking, Fast and Slow',
    'Daniel Kahneman',
    '9780374533557',
    10,
    '2024-03-02',
    'Kahneman distils decades of research into two systems of thought: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberate, logical). We default to System 1 far more than we realise, leading to predictable cognitive biases. Awareness is the first step to better decisions.',
    'Pairs well with Predictably Irrational.',
    'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg'
  )
ON CONFLICT DO NOTHING;
