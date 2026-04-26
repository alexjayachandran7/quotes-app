import { useState, useEffect } from "react";

const API = "https://xy8sw7zhy3.execute-api.eu-north-1.amazonaws.com";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [random, setRandom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/quotes`)
      .then(r => r.json())
      .then(data => { setQuotes(data); setLoading(false); });
    fetchRandom();
  }, []);

  function fetchRandom() {
    fetch(`${API}/quotes/random`)
      .then(r => r.json())
      .then(setRandom);
  }

  if (loading) return <div className="loading">Loading quotes...</div>;

  return (
    <div className="app">
      <header>
        <h1>Daily Quotes</h1>
        <p>Wisdom from history's greatest minds</p>
      </header>

      <section className="random-section">
        <h2>Quote of the moment</h2>
        {random && (
          <div className="random-card">
            <p className="quote-text">"{random.text}"</p>
            <p className="quote-author">— {random.author}, {random.year}</p>
            <span className="category">{random.category}</span>
          </div>
        )}
        <button onClick={fetchRandom}>New quote ↻</button>
      </section>

      <section className="all-section">
        <h2>All quotes</h2>
        <div className="grid">
          {quotes.map(q => (
            <div key={q.id} className="card">
              <p className="quote-text">"{q.text}"</p>
              <p className="quote-author">— {q.author}, {q.year}</p>
              <span className="category">{q.category}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}