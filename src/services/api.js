import axios from 'axios';

const API_URL = 'http://localhost:8080/notes'; // Backend URL

export const fetchNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
