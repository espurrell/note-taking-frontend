import axios from 'axios';

const API_URL = 'http://localhost:8080/notes'; // Backend URL

export const fetchNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note, {
      headers: {
        'Content-Type': 'application/json',  // Ensure this header is set
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const fetchNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`); // Use axios for consistency
    return response.data;
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    throw error;
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    console.log("Updating note:", id, updatedNote); // Check what's being sent
    const response = await axios.put(`http://localhost:8080/notes/${id}`, updatedNote);
    console.log("Updated note response:", response.data); // Check response
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};



export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
