import { useState, useEffect } from "react";
export default function SearchBar({ onQueryChange }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const id = setTimeout(() => onQueryChange(q), 250);
    return () => clearTimeout(id);
  }, [q]);
  return (
    <input
      className="input"
      placeholder="Search plants…"
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />
  );
}
