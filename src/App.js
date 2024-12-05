import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);

  const handleNoteAdded = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <h1>Note Taking App</h1>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <NoteList notes={notes} />
    </div>
  );
};

export default App;
