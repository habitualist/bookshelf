/**
 * middleware/errorHandler.js
 *
 * Centralised Express error handler.
 * Logs the full error server-side and sends a user-friendly page.
 */

export function errorHandler(err, req, res, _next) {
  console.error("❌  Unhandled error:", err.stack || err.message);

  const status = err.status || 500;
  const message =
    status === 500
      ? "Something went wrong on our end. Please try again."
      : err.message;

  // Respond with HTML page or JSON depending on Accept header
  if (req.accepts("html")) {
    res.status(status).render("error", { status, message });
  } else {
    res.status(status).json({ error: message });
  }
}
