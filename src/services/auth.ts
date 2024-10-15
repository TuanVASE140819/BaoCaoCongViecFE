export const login = async (email: string, password: string): Promise<any> => {
  const response = await fetch(`https://baocaocongviecbe-1.onrender.com/api/auth/login`, {
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
