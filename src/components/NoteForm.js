import React, { useState } from 'react';
import { createNote } from '../services/api';

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending note:', { title, content });
      const newNote = await createNote({ title, content });
      console.log('Note created:', newNote);
      onNoteAdded(newNote); // Notify parent to refresh the note listsetTitle('');
      setContent('');
      } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
