import React, { useState, useEffect } from "react";

function NoteInput({ onAdd, onCancel, initialValue = { title: "", text: "", image: null } }) {
  const [title, setTitle] = useState(initialValue.title || "");
  const [text, setText] = useState(initialValue.text || "");
  const [image, setImage] = useState(initialValue.image || null);

  useEffect(() => {
    setTitle(initialValue.title || "");
    setText(initialValue.text || "");
    setImage(initialValue.image || null);
  }, [initialValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (title.trim() === "" && text.trim() === "") return;
    onAdd({ title, text, image });
    setTitle("");
    setText("");
    setImage(null);
  };

  return (
    <div className="container">
      <h2 className="title">{initialValue.text ? "Editar Nota" : "Crear Nota"}</h2>

      <input
        type="text"
        placeholder="Título"
        className="input-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows={5}
        placeholder="Escribe tu nota aquí..."
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {image && (
        <div>
          <img src={image} alt="preview" className="image-preview" />
          <button
            onClick={() => setImage(null)}
            className="button remove-image-button"
          >
            Quitar imagen
          </button>
        </div>
      )}

      <div className="button-group">
        <button onClick={handleAdd} className="button">
          Guardar Nota
        </button>
        <button onClick={onCancel} className="button cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default NoteInput;
