const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const toggleDarkBtn = document.getElementById("toggle-dark");

// Fetch quote from accessible API
async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";

  try {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    const random = data[Math.floor(Math.random() * data.length)];

    quoteText.textContent = `"${random.text}"`;
    quoteAuthor.textContent = random.author ? `— ${random.author}` : "— Unknown";

    // Trigger fade-in animation
    quoteText.classList.remove("fade-in");
    quoteAuthor.classList.remove("fade-in");

    void quoteText.offsetWidth; // force reflow
    void quoteAuthor.offsetWidth;

    quoteText.classList.add("fade-in");
    quoteAuthor.classList.add("fade-in");

  } catch (error) {
    quoteText.textContent = "Oops! Couldn't fetch quote.";
    quoteAuthor.textContent = "— Try again later";
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
toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Event listeners
newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);

// Initial quote
fetchQuote();