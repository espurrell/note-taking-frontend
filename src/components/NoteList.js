import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote, updateNote } from '../services/api';
import NoteForm from './NoteForm';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if a note is being edited
  const [editingNote, setEditingNote] = useState(null); // Track which note is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditClick = (note) => {
    setIsEditing(true);
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = async () => {
    if (!editTitle || !editContent) {
      alert("Title and content cannot be empty.");
      return;
    }
    
    const updatedNote = { title: editTitle, content: editContent };
    
    try {
      const updated = await updateNote(editingNote.id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updated.id ? updated : note))
      );
      setIsEditing(false); // Hide the edit form after saving
      setEditingNote(null); // Clear the editing note
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingNote(null); // Clear the editing note when canceling
  };

  return (
    <div>
      {/* Add Note Form */}
      <NoteForm onNoteAdded={handleNoteAdded} />

      {/* Notes List */}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {isEditing && editingNote.id === note.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                {/* Edit Button with 'edit' class */}
                <button className="edit" onClick={() => handleEditClick(note)}>Edit</button>
                {/* Delete Button with 'delete' class */}
                <button className="delete" onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
