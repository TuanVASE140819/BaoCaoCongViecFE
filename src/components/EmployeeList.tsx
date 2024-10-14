import React, { useEffect, useState } from 'react';
import userService from '../services/UserService';
import apiService from '../services/apiService';
import { Employee, Role } from './types/Employee';
import RoleList from './RoleList'; // Import RoleList

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    tenNhanVien: '',
    email: '',
    IDRole: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await userService.getUsers();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiService.get<Role[]>('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleAddEmployeeClick = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewEmployee({
      tenNhanVien: '',
      email: '',
      IDRole: '',
    });
    setMessage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.tenNhanVien || !newEmployee.email || !newEmployee.IDRole) {
      setMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      const employeeData: Partial<Employee> = {
        ...newEmployee,
        IDRole: { _id: newEmployee.IDRole } as Role,
      };

      if (selectedEmployee) {
        await userService.updateUser(selectedEmployee._id, employeeData);
        setMessage('Cập nhật nhân viên thành công!');
      } else {
        await userService.createUser(employeeData);
        setMessage('Thêm nhân viên thành công!');
      }
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving employee:', error);
      setMessage('Có lỗi xảy ra khi lưu nhân viên.');
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const data = await userService.getUserById(id);
      setSelectedEmployee(data);
      setNewEmployee({
        tenNhanVien: data.tenNhanVien,
        email: data.email,
        IDRole: data.IDRole._id,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      try {
        await userService.deleteUser(id);
        setMessage('Xóa nhân viên thành công!');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        setMessage('Có lỗi xảy ra khi xóa nhân viên.');
      }
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Danh sách nhân viên
      </h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={handleAddEmployeeClick}
      >
        Thêm nhân viên
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                STT
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
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr
                key={employee._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {indexOfFirstEmployee + index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.tenNhanVien}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.IDRole.tenVaiTro}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  {employee.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-200">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 mr-2"
                    onClick={() => handleViewDetails(employee._id)}
                  >
                    Xem
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from(
              { length: Math.ceil(employees.length / employeesPerPage) },
              (_, i) => (
                <li key={i} className="mx-1">
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } transition duration-300`}
                  >
                    {i + 1}
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl mb-4 text-gray-800">
              {selectedEmployee
                ? 'Cập nhật thông tin nhân viên'
                : 'Thêm nhân viên mới'}
            </h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên nhân viên</label>
                <input
                  type="text"
                  name="tenNhanVien"
                  value={newEmployee.tenNhanVien}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên nhân viên"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vị trí</label>
                <select
                  name="IDRole"
                  value={newEmployee.IDRole}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn vị trí</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.tenVaiTro}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300 mr-2"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  {selectedEmployee ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <RoleList /> Thêm RoleList vào đây */}
    </div>
  );
};

export default EmployeeList;
