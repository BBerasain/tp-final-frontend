import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function Notepad({ notes, onCreate, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que querés borrar esta nota?"
    );
    if (confirmDelete) {
      onDelete(index);
    }
  };

  return (
    <div className="container">
      <h2 className="title">
        {notes.length === 0 ? "Notas" : "Notas Guardadas"}
      </h2>

      {notes.length > 0 && (
        <Search query={searchQuery} onChange={setSearchQuery} />
      )}

      {notes.length === 0 ? (
        <p>No se crearon notas aún.</p>
      ) : filteredNotes.length === 0 ? (
        <p>No hay notas que coincidan con la búsqueda.</p>
      ) : (
        <div className="note-list">
          {filteredNotes.map((note, i) => (
            <div key={i} className="note-item">
              <div
                className="note-title"
                onClick={() => navigate(`/note/${i}`)}
              >
                {note.title || "(Sin título)"}
              </div>

              <div className="note-text">
                {note.text.length > 100
                  ? note.text.slice(0, 100) + "..."
                  : note.text}
              </div>

              {note.image && (
                <img
                  src={note.image}
                  alt="nota"
                  className="note-item-image"
                />
              )}

              <div className="button-group">
                <button
                  className="button button-view"
                  onClick={() => navigate(`/note/${i}`)}
                >
                  Ver
                </button>

                <button
                  className="button button-edit"
                  onClick={() => onEdit(i)}
                >
                  Editar
                </button>

                <button
                  className="button button-delete"
                  onClick={() => handleDelete(i)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onCreate} className="button">
        Crear Nota
      </button>
    </div>
  );
}

export default Notepad;
