import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Document {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Document[]>([]);
  const [recent, setRecent] = useState<Document[]>([]);

  // Fetch  most-recent documents on mount
  useEffect(() => {
    axios.get("/api/documents?limit=4&sort=desc").then(res => {
      setRecent(res.data);
    });
  }, []);

  // Run a search for some item
  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.get(`/api/documents?search=${encodeURIComponent(query)}`);
    setResults(res.data);
  };

  return (
    <div className="home-page">
      <h1>Welcome!</h1>

      {/* Search bar */}
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={query}
          placeholder="Search documents…"
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* If there is a query, show results; otherwise show recent */}
      {query ? (
        <section>
          <h2>Results for “{query}”</h2>
          <ResultsTable docs={results} />
        </section>
      ) : (
        <section>
          <h2>Recent Uploads</h2>
          <ResultsTable docs={recent} />
        </section>
      )}

      <nav>
        <ul>
          <li><Link to="/upload">Scan Documents</Link></li>
          <li><Link to="/integrations">Integrations</Link></li>
        </ul>
      </nav>
    </div>
  );
}

//  table component
function ResultsTable({ docs }: { docs: Document[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Uploaded By</th>
          <th>Uploaded At</th>
          <th>Document ID</th>
        </tr>
      </thead>
      <tbody>
        {docs.map(doc => (
          <tr key={doc.id}>
            <td>{doc.filename}</td>
            <td>{doc.uploadedBy}</td>
            <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
            <td>{doc.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
