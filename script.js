const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");
const categorySelect = document.getElementById("category");
const quoteBox = document.getElementById("quote-box");

// Fetch quote (dummyjson is frontend-safe)
async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";
  quoteBox.classList.remove("fade");

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (err) {
    quoteText.textContent = "Oops! Couldn't fetch quote.";
    quoteAuthor.textContent = "— Try again later";
    console.error("Fetch failed:", err);
  } finally {
    quoteBox.classList.add("fade");
  }
}

// Copy to clipboard
function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text)
    .then(() => showToast("📋 Quote copied!"))
    .catch(() => showToast("❌ Failed to copy"));
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "6px";
  toast.style.zIndex = "999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s";

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = "1");

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Load dark mode if saved
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
toggleDarkBtn.addEventListener("click", toggleDarkMode);
categorySelect.addEventListener("change", fetchQuote);

// Initial quote
fetchQuote();