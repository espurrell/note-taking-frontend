import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import { fetchNotes } from './services/api';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    loadNotes();
  }, []);

  return (
    <div>
      <h1>Note Taking App</h1>
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
