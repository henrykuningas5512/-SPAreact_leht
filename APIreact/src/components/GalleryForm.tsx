import { useState } from "react";
import { Artwork } from "../types/Artwork";

interface Props {
  onAdd: (artwork: Artwork) => void;
}

export default function GalleryForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("painting");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !artist || !image) return;

    const newArtwork: Artwork = {
      id: Date.now(),
      title,
      artist,
      image,
      category,
      favorite: false,
    };

    onAdd(newArtwork);

    setTitle("");
    setArtist("");
    setImage("");
  }

  return (
    <form style={{ marginBottom: "20px" }}>
      <h2>Lisa kunstiteos</h2>

      <input
        placeholder="Pealkiri"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Autor"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        placeholder="Pildi URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="painting">Maal</option>
        <option value="photo">Foto</option>
        <option value="digital">Digitaal</option>
      </select>

      <button type="submit" onClick={handleSubmit}>
        Lisa
      </button>
    </form>
  );
}