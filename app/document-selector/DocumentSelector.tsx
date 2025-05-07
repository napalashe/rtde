"use client";

import { useState, useEffect } from "react";
import DocumentTile from "./DocumentTile";

interface Document {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface DocumentSelectorProps {
  signOut?: () => void;
}

export default function DocumentSelector({ signOut }: DocumentSelectorProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchDocuments");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    try {
      await fetch("/api/deleteDocument", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetchDocuments(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const createDocument = async () => {
    const title = prompt("Enter a title for the new document:");
    if (!title) return;

    try {
      const response = await fetch("/api/createDocument", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        const err = await response.json();
        alert(err.error || "Failed to create document");
        return;
      }
      const newDoc = await response.json();
      window.location.href = `/editor?docId=${newDoc.id}`;
    } catch (error) {
      alert("Failed to create document");
      console.error("Failed to create document:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="editor-title">Select a Document</h1>

        <div className="action-buttons">
          <button onClick={fetchDocuments} className="refresh-button">
            Refresh
          </button>
          <button onClick={createDocument} className="crete-new-button">
            Create New Document
          </button>
          <button onClick={() => signOut?.()} className="signout-button">
            Sign Out
          </button>
        </div>

        <div className="text-control">
          {loading ? (
            <p>Loading...</p>
          ) : (
            documents.map((doc) => (
              <DocumentTile
                key={doc.id}
                id={doc.id}
                title={doc.title}
                createdAt={doc.createdAt}
                onDelete={deleteDocument}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
