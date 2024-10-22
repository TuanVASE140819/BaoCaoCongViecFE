// src/types/staff.ts
export interface Role {
  _id: string;
  tenVaiTro: 'Quản trị viên' | 'Nhân viên'; // Add more roles as needed
}

export interface Staff {
  _id: string;
  tenNhanVien: string;
  email: string;
  password: string;
  IDRole: Role;
  __v: number;
}
