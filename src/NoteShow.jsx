import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NoteShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    const notes = saved ? JSON.parse(saved) : [];
    const selectedNote = notes[parseInt(id)];
    setNote(selectedNote);
  }, [id]);

  if (!note) {
    return <p className="container">Nota no encontrada.</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Detalle de Nota</h2>
      <h3 className="note-title">{note.title || "(Sin título)"}</h3>
      <div className="note-show-text">{note.text}</div>
      {note.image && (
        <img
          src={note.image}
          alt="nota"
          className="note-show-image"
        />
      )}
      <button onClick={() => navigate(-1)} className="button">
        Volver
      </button>
    </div>
  );
}

export default NoteShow;
