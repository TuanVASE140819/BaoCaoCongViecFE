import { API_BASE_URL } from 'src/config';

export const getRoles = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/roles`, {
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
