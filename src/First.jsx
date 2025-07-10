import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Notepad from "./Notepad";
import NoteInput from "./NoteInput";
import NoteShow from "./NoteShow";

function First() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [showInput, setShowInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCreate = () => {
    setEditingIndex(null);
    setShowInput(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowInput(true);
  };

  const addOrUpdateNote = (newNote) => {
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = newNote;
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, newNote]);
    }
    setShowInput(false);
    setEditingIndex(null);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          showInput ? (
            <NoteInput
              onAdd={addOrUpdateNote}
              onCancel={() => {
                setShowInput(false);
                setEditingIndex(null);
              }}
              initialValue={
                editingIndex !== null
                  ? notes[editingIndex]
                  : { title: "", text: "", image: null }
              }
            />
          ) : (
            <Notepad
              notes={notes}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={deleteNote}
            />
          )
        }
      />
      <Route path="/note/:id" element={<NoteShow />} />
    </Routes>
  );
}

export default First;
