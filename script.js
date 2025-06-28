const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");

async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";
  document.getElementById("quote-box").classList.remove("fade");

  try {
    // Use quotable.io directly (CORS-enabled)
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Oops! Couldn't fetch quote.";
    quoteAuthor.textContent = "— Try again later";
    console.error("Quote fetch failed:", error);
  } finally {
    document.getElementById("quote-box").classList.add("fade");
  }
}

function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy quote.");
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Apply saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
toggleDarkBtn.addEventListener("click", toggleDarkMode);

// Initial fetch
fetchQuote();