const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");
const quoteBox = document.getElementById("quote-box");

// Fetch quote from APIs with fallback
async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";
  quoteBox.classList.remove("fade");

  try {
    // Try ZenQuotes
    const res1 = await fetch("https://zenquotes.io/api/random");
    const data1 = await res1.json();
    if (data1 && data1[0]?.q) {
      quoteText.textContent = `"${data1[0].q}"`;
      quoteAuthor.textContent = `— ${data1[0].a}`;
    } else {
      throw new Error("ZenQuotes failed");
    }
  } catch (err1) {
    // Try Quotable if ZenQuotes fails
    try {
      const res2 = await fetch("https://api.quotable.io/random");
      const data2 = await res2.json();
      quoteText.textContent = `"${data2.content}"`;
      quoteAuthor.textContent = `— ${data2.author}`;
    } catch (err2) {
      quoteText.textContent = "Oops! Couldn't fetch quote.";
      quoteAuthor.textContent = "— Try again later";
    }
  } finally {
    // Add fade animation
    quoteBox.classList.add("fade");
  }
}

// Copy quote to clipboard
function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text)
    .then(() => alert("Quote copied to clipboard!"))
    .catch(() => alert("Failed to copy quote."));
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Initialize dark mode on load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Event Listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
toggleDarkBtn.addEventListener("click", toggleDarkMode);

// Load initial quote
fetchQuote();