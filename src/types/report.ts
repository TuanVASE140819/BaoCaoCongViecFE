export interface Report {
  _id: string;
  ngayBaoCao: string;
  noiDungHomNay: string;
  noiDungDuKienNgayMai: string;
  IDnhanVien: {
    tenNhanVien: string;
    email: string;
    password: string;
    IDRole: string;
  };
}
