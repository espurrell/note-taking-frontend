import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote } from './services/api';


const App = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes); // Populate state with fetched notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    loadNotes();
  }, []);

  const handleNoteAdded = async (newNoteData) => {
    try {
      console.log('Creating note with data:', newNoteData);
      const newNote = await createNote(newNoteData); // Send to backend and get saved note
      console.log('Created note:', newNote);
      setNotes((prevNotes) => [...prevNotes, newNote]); // Update state
    } catch (error) {
      console.error("Error adding note:", error);
    }
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
