import React, { useState } from 'react';

const EmployeeReports = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const reports = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      todayReport: 'Hoàn thành module đăng nhập',
      tomorrowReport: 'Bắt đầu module đăng ký',
      date: '2024-10-10',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      todayReport: 'Thiết kế giao diện trang chủ',
      tomorrowReport: 'Thiết kế giao diện trang sản phẩm',
      date: '2024-10-10',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      todayReport: 'Kiểm tra và sửa lỗi hệ thống',
      tomorrowReport: 'Viết tài liệu hướng dẫn sử dụng',
      date: '2024-10-11',
    },
    // Thêm dữ liệu mẫu khác nếu cần
  ];

  const filteredReports = reports.filter(
    (report) => report.date === selectedDate,
  );

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Danh sách báo cáo của nhân viên trong ngày
      </h2>
      <div className="mb-4 flex items-center space-x-4">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          htmlFor="date"
        >
          Chọn ngày:
        </label>
        <input
          type="date"
          id="date"
          className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Tên
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Báo cáo hôm nay
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Báo cáo ngày mai
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {report.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {report.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {report.todayReport}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {report.tomorrowReport}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeReports;
