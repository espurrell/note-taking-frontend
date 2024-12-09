import React, { useState } from 'react';
import { createNote } from '../services/api';
import { fetchNoteById } from '../services/api';

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending note:', { title, content });
      const newNote = await createNote({ title, content });
      console.log('Note created:', newNote);
      onNoteAdded(newNote); // Notify parent to refresh the note list
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // search by Id
  const handleSearch = async () => {
    try {
      console.log('Searching for note with ID:', searchId);
      const note = await fetchNoteById(searchId); // Call the searchNote API function
      console.log('Search result:', note);
      setSearchResult(note);
    } catch (error) {
      console.error('Error fetching note:', error);
      setSearchResult(null);
    }
  };

  return (
    <div>
      <div className="top-section">
        <div className="form-container">
          <h3>Add New Note</h3>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Content:</label>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add Note</button>
          </form>
        </div>

        <div className="search-container">
          <h3>Search Note by ID</h3>
          <input
            type="text"
            placeholder="Enter Note ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {searchResult && (
        <div className="SearchResults">
          <h4>Search Result:</h4>
          <p><strong>ID:</strong> {searchResult.id}</p>
          <p><strong>Title:</strong> {searchResult.title}</p>
          <p><strong>Content:</strong> {searchResult.content}</p>
        </div>
      )}
    </div>
  );
};

export default NoteForm;
