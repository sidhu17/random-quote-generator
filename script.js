const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");

// Fetch quote using a proxy to fix CORS issues on Chrome and GitHub Pages
async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";
  document.getElementById("quote-box").classList.remove("fade");

  try {
    // Main API via CORS proxy
    const proxyRes = await fetch("https://api.allorigins.win/raw?url=https://api.quotable.io/random");
    const data = await proxyRes.json();

    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (mainErr) {
    // Fallback to ZenQuotes if main API fails
    try {
      const fallbackRes = await fetch("https://zenquotes.io/api/random");
      const fallbackData = await fallbackRes.json();

      quoteText.textContent = `"${fallbackData[0].q}"`;
      quoteAuthor.textContent = `— ${fallbackData[0].a}`;
    } catch (fallbackErr) {
      quoteText.textContent = "Oops! Couldn't fetch quote.";
      quoteAuthor.textContent = "— Try again later";
    }
  } finally {
    document.getElementById("quote-box").classList.add("fade");
  }
}

// Copy quote to clipboard
function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy quote.");
  });
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
toggleDarkBtn.addEventListener("click", toggleDarkMode);

// Load initial quote
fetchQuote();