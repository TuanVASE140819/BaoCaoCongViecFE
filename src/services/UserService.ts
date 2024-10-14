// src/services/UserService.ts
import apiService from './apiService';
import { Employee } from '../components/types/Employee';

class UserService {
  public async getUsers(): Promise<Employee[]> {
    const response = await apiService.get<Employee[]>('/api/users');
    return response.data;
  }

  public async getUserById(id: string): Promise<Employee> {
    const response = await apiService.get<Employee>(`/api/users/${id}`);
    return response.data;
  }

  public async createUser(data: Partial<Employee>): Promise<Employee> {
    const response = await apiService.post<Employee>('/api/users', data);
    return response.data;
  }

  public async updateUser(
    id: string,
    data: Partial<Employee>,
  ): Promise<Employee> {
    const response = await apiService.put<Employee>(`/api/users/${id}`, data);
    return response.data;
  }

  public async deleteUser(id: string): Promise<void> {
    await apiService.delete<void>(`/api/users/${id}`);
  }
}

export default new UserService();
