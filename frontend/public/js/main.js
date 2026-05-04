/**
 * main.js — Client-side interactions for BookShelf
 */

// ── Delete confirmation ────────────────────────────────────────────────────
function confirmDelete() {
  return window.confirm(
    "Are you sure you want to delete this book? This action cannot be undone."
  );
}

// ── Live cover preview on Add/Edit form ───────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn    = document.getElementById("fetchCoverBtn");
  const coverImg    = document.getElementById("coverImg");
  const isbnInput   = document.getElementById("isbn");
  const titleInput  = document.getElementById("title");

  if (!fetchBtn) return; // not on form page

  fetchBtn.addEventListener("click", async () => {
    const query =
      isbnInput?.value.trim() || titleInput?.value.trim();

    if (!query) {
      alert("Please enter a title or ISBN first.");
      return;
    }

    fetchBtn.textContent = "⏳ Fetching…";
    fetchBtn.disabled = true;

    try {
      const res  = await fetch(`/api/cover/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.cover_url && !data.cover_url.includes("no-cover")) {
        coverImg.src = data.cover_url;
      } else {
        coverImg.src = "/images/no-cover.svg";
        alert("No cover found. The default image will be used.");
      }
    } catch (err) {
      console.error("Cover fetch error:", err);
      alert("Could not fetch cover. Please check your connection.");
    } finally {
      fetchBtn.textContent = "🔍 Preview Cover";
      fetchBtn.disabled = false;
    }
  });
});
