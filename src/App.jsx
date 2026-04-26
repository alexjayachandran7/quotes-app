import { useState, useEffect } from "react";

const API = "https://xy8sw7zhy3.execute-api.eu-north-1.amazonaws.com";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadQuote(); }, []);

  function loadQuote() {
    setLoading(true);
    fetch(`${API}/quotes/random`)
      .then(r => r.json())
      .then(data => { setQuote(data); setLoading(false); });
  }

  return (
    <div className="app">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="quote-wrap">
          <div className="quote-mark">"</div>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">— {quote.author}</p>
          <button onClick={loadQuote}>Next ↻</button>
        </div>
      )}
    </div>
  );
}