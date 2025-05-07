import Link from "next/link";
import styles from "./DocumentTile.module.css";

interface DocumentTileProps {
  id: string;
  title: string;
  createdAt: string;
  onDelete?: (id: string) => void;
}

export default function DocumentTile({
  id,
  title,
  createdAt,
  onDelete,
}: DocumentTileProps) {
  return (
    <div className={styles.tile}>
      <Link href={`/editor?docId=${id}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.date}>{new Date(createdAt).toLocaleString()}</p>
      </Link>
      {onDelete && (
        <button onClick={() => onDelete(id)} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  );
}
