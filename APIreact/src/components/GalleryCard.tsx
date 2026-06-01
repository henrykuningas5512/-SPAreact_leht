import type { Artwork } from "../types/Artwork";

interface Props {
  artwork: Artwork;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function GalleryCard({
  artwork,
  onDelete,
  onToggleFavorite,
  onEdit,
}: Props) {
  return (
    <div className="card">
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

      <div className="card-actions">
        <button onClick={() => onToggleFavorite(artwork.id)}>
          {artwork.favorite ? "Lemmik" : "Lisa lemmik"}
        </button>

        <button onClick={() => onEdit(artwork.id)}>
          Muuda
        </button>

        <button onClick={() => onDelete(artwork.id)}>
          Kustuta
        </button>
      </div>
    </div>
  );
}