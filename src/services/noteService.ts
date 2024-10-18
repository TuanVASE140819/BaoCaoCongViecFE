// src/services/noteService.ts
import { API_BASE_URL } from 'src/config';

export const fetchNoteById = async (noteId: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/notes/6711cd78e5071d35cd6c1174`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.json();
};

export const updateNoteById = async (
  noteId: string,
  noteData: { content: string; reportId: string }
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.json();
};
