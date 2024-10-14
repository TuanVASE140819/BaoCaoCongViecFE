import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Role } from './types/Employee';

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await apiService.get<Role[]>('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Danh sách chức vụ
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                STT
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Tên chức vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {role.tenVaiTro}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleList;
