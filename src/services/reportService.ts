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

export const fetchReportsByDate = async (date: string): Promise<Report[]> => {
  const response = await fetch(`${API_BASE_URL}/api/reports?date=${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  const data = await response.json();

  return data.map((report: any) => ({
    _id: report._id,
    ngayBaoCao: report.ngayBaoCao,
    noiDungHomNay: report.noiDungHomNay,
    noiDungDuKienNgayMai: report.noiDungDuKienNgayMai,
    IDnhanVien: {
      tenNhanVien: report.IDnhanVien.tenNhanVien,
      email: report.IDnhanVien.email,
      password: report.IDnhanVien.password,
      IDRole: report.IDnhanVien.IDRole,
    },
  }));
};
export const restartService = async (): Promise<void> => {
  // Implement the service restart logic here
  console.log('Service restarted');
};
