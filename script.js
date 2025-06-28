const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");
const quoteBox = document.getElementById("quote-box");

// Fetch from frontend-safe API
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
    .then(() => alert("Quote copied!"))
    .catch(() => alert("Copy failed"));
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
toggleDarkBtn.addEventListener("click", toggleDarkMode);

// Initial quote
fetchQuote();