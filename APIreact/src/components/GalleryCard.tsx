import { Artwork } from "../types/Artwork";

interface Props {
  artwork: Artwork;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export default function GalleryCard({
  artwork,
  onDelete,
  onToggleFavorite,
}: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "12px",
        width: "250px",
      }}
    >
      <img
        src={artwork.image}
        alt={artwork.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
      <p>{artwork.category}</p>

      <button onClick={() => onToggleFavorite(artwork.id)}>
        {artwork.favorite ? "❤️ Lemmik" : "🤍 Lisa lemmik"}
      </button>

      <button onClick={() => onDelete(artwork.id)}>
        🗑 Kustuta
      </button>
    </div>
  );
}