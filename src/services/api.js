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


export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
