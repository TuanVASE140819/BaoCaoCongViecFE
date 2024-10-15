import { API_BASE_URL } from 'src/config';

export const login = async (email: string, password: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.json();
};

export const getUserInfo = async (token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/userInfoByToken?token=${token}`, {
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
