import "./App.css";
import { useEffect, useState } from "react";
import type { Artwork } from "./types/Artwork";
import GalleryForm from "./components/GalleryForm";
import GalleryCard from "./components/GalleryCard";

function App() {
  // STATE
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = localStorage.getItem("artworks");

    if (savedArtworks) {
      return JSON.parse(savedArtworks);
    }

    return [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sort, setSort] = useState("newest");

  // LOCAL STORAGE SAVE
  useEffect(() => {
    localStorage.setItem("artworks", JSON.stringify(artworks));
  }, [artworks]);

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

  function editArtwork(id: number) {
  const newTitle = prompt("Uus pealkiri:");

  if (!newTitle) return;

  setArtworks((prev) =>
    prev.map((art) =>
      art.id === id
        ? { ...art, title: newTitle }
        : art
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
    )
    .sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }

      if (sort === "oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <div>
          <h1>Kunstigalerii</h1>
          <p>Lisa, filtreeri ja halda oma kunstiteoseid.</p>
        </div>

        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="controls">
        <input
          placeholder="Otsi kunstiteoseid..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setFilter("all")}>Kõik</button>
        <button onClick={() => setFilter("favorites")}>Lemmikud</button>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Uuemad enne</option>
          <option value="oldest">Vanemad enne</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <GalleryForm onAdd={addArtwork} />

      {filteredArtworks.length === 0 ? (
        <p className="empty">Ühtegi kunstiteost ei leitud</p>
      ) : (
        <div className="gallery">
          {filteredArtworks.map((art) => (
            <GalleryCard
            key={art.id}
            artwork={art}
            onDelete={deleteArtwork}
            onToggleFavorite={toggleFavorite}
            onEdit={editArtwork}
          />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;