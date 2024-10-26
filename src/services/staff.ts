import { API_BASE_URL } from 'src/config';

export const getStaff = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
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

export const createStaff = async (staffData: {
  tenNhanVien: string;
  email: string;
  password: string;
  IDRole: string;
  ngaySinh: string;
  nguoiTao: string;
}): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(staffData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Failed to create staff:', responseData);
    throw new Error(`Failed to create staff: ${response.status}`);
  }

  return responseData;
};

export const updateStaff = async (
  userId: string,
  staffData: {
    tenNhanVien: string;
    email: string;
    password: string;
    IDRole: string;
    ngaySinh: string;
    nguoiTao: string;
  }
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(staffData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Failed to update staff:', responseData);
    throw new Error(`Failed to update staff: ${response.status}`);
  }

  return responseData;
};

export const deleteStaff = async (userId: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const responseData = await response.json();
    console.error('Failed to delete staff:', responseData);
    throw new Error(`Failed to delete staff: ${response.status}`);
  }

  return response.json();
};
