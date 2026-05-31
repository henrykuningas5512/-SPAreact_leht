import { useState } from "react";
import { Artwork } from "./types/Artwork";
import GalleryForm from "./components/GalleryForm";
import GalleryCard from "./components/GalleryCard";

function App() {
  // STATE
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // FUNCTIONS
  function addArtwork(newArtwork: Artwork) {
    setArtworks((prev) => [newArtwork, ...prev]);
  }

  function deleteArtwork(id: number) {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleFavorite(id: number) {
    setArtworks((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, favorite: !a.favorite } : a
      )
    );
  }

  // FILTER + SEARCH
  const filteredArtworks = artworks
    .filter((art) => {
      if (filter === "favorites") return art.favorite;
      return true;
    })
    .filter((art) =>
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.artist.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div
      style={{
        padding: "20px",
        background: darkMode ? "#111" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <h1>Kunstigalerii 🎨</h1>

      <button onClick={() => setDarkMode((prev) => !prev)}>
        {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>

      {/* SEARCH */}
      <br />
      <br />

      <input
        placeholder="Otsi kunstiteoseid..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setFilter("all")}>Kõik</button>
        <button onClick={() => setFilter("favorites")}>Lemmikud</button>
      </div>

      {/* FORM */}
      <GalleryForm onAdd={addArtwork} />

      {/* EMPTY STATE */}
      {filteredArtworks.length === 0 ? (
        <p>Ühtegi kunstiteost ei leitud 🎭</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {filteredArtworks.map((art) => (
            <GalleryCard
              key={art.id}
              artwork={art}
              onDelete={deleteArtwork}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;