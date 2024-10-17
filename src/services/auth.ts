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

export const registerEmployee = async (
  tenNhanVien: string,
  email: string,
  password: string,
  IDRole: string
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ tenNhanVien, email, password, IDRole }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.json();
};

const sha1 = async (message: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
};

export const checkPasswordPwned = async (password: string): Promise<boolean> => {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  const data = await response.text();
  const lines = data.split('\n');
  return lines.some((line) => {
    const [hashSuffix] = line.split(':');
    return hashSuffix === suffix;
  });
};
