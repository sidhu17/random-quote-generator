const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");

// Fetch quote from Quotable API
async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";

  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Oops! Couldn't fetch quote.";
    quoteAuthor.textContent = "— Try again later";
    console.error(error);
  }
}

// Copy quote to clipboard
function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text)
    .then(() => alert("Quote copied to clipboard!"))
    .catch(() => alert("Failed to copy quote."));
}

// Event Listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);

// Fetch initial quote
fetchQuote();