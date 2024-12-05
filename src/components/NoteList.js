import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../services/api';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    getNotes();
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h2>Note List</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
