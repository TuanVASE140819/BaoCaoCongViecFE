import { API_BASE_URL } from 'src/config';

export const fetchBirthdays = async (month: number): Promise<any> => {
  // /api/users/birthdays?month=10

  const response = await fetch(`${API_BASE_URL}/api/users/birthdays?month=${month}`, {
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
