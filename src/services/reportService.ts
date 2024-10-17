import { API_BASE_URL } from 'src/config';

export const fetchEmployeeReport = async (userId: string, date: string) => {
  const response = await fetch(`${API_BASE_URL}/api/reports/employee/${userId}?date=${date}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.status}`);
  }
  return response.json();
};

export const createReport = async (reportData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create report: ${response.status}`);
  }
  return response.json();
};

export const updateReport = async (reportId: string, reportData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update report: ${response.status}`);
  }
  return response.json();
};

export const fetchReportsByDate = async (date: string) => {
  const response = await fetch(`${API_BASE_URL}/api/reports?date=${date}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.status}`);
  }
  return response.json();
};

export const restartService = async () => {
  const response = await fetch(`${API_BASE_URL}/restart`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to restart service: ${response.status}`);
  }

  return response.json();
};
