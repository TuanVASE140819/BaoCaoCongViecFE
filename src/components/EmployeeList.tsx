import React from 'react';

const EmployeeList = () => {
  const employees = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      position: 'Developer',
      email: 'a@example.com',
    },
    { id: 2, name: 'Trần Thị B', position: 'Designer', email: 'b@example.com' },
    { id: 3, name: 'Lê Văn C', position: 'Manager', email: 'c@example.com' },
    // Thêm dữ liệu mẫu khác nếu cần
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Danh sách nhân viên
      </h2>
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
                Vị trí
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.position}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
