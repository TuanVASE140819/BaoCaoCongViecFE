// src/types/Employee.ts
export interface Role {
  _id: string;
  tenVaiTro: string;
  __v: number;
}

export interface Employee {
  _id: string;
  tenNhanVien: string;
  email: string;
  IDRole: Role;
  __v: number;
}
