import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import { useStaff } from 'src/hooks/useUser';
import { getRoles } from 'src/services/roles';
import { createStaff, updateStaff, deleteStaff } from 'src/services/staff';
import { Role } from 'src/types/role';
import { Staff } from 'src/types/staff';
import { styled } from '@mui/material/styles';
import { Chip, Switch } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: '16px',
  border: 'none',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transition: 'background-color 0.3s ease',
  },
}));

const CenteredTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: '12px',
  border: 'none',
}));

export function UserList() {
  const { staff, loading, error: staffError, fetchStaff } = useStaff();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const UserInfor = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [newEmployee, setNewEmployee] = useState({
    tenNhanVien: '',
    email: '',
    password: '',
    IDRole: '',
    ngaySinh: '',
    nguoiTao: UserInfor.tenNhanVien || 'admin',
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState({
    tenNhanVien: '',
    email: '',
    password: '',
    IDRole: '',
    ngaySinh: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const filteredStaff = staff.filter((member) =>
    member.tenNhanVien.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStaff = filteredStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleClickOpen = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setNewEmployee({
      tenNhanVien: '',
      email: '',
      password: '',
      IDRole: '',
      ngaySinh: '',
      nguoiTao: '',
      isActive: true,
    }); // Clear input fields
    setSelectedEmployeeId(null);
    setOpen(false);
  };

  const handleEditClick = (employee: Staff) => {
    setNewEmployee({
      tenNhanVien: employee.tenNhanVien,
      email: employee.email,
      password: '', // Password should be empty for security reasons
      IDRole: employee.IDRole._id,
      ngaySinh: employee.ngaySinh ? employee.ngaySinh.split('T')[0] : '', // Handle date format
      nguoiTao: employee.nguoiTao,
      isActive: employee.isActive,
    });
    setSelectedEmployeeId(employee._id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setEmployeeToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      try {
        await deleteStaff(employeeToDelete);
        alert('Staff deleted successfully');
        fetchStaff(); // Refresh the staff list
      } catch (err) {
        console.error('Failed to delete staff:', err);
        alert(`Failed to delete staff: ${err.message}`);
      } finally {
        setDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const validateForm = () => {
    const errors = {
      tenNhanVien: '',
      email: '',
      password: '',
      IDRole: '',
      ngaySinh: '',
    };

    if (!newEmployee.tenNhanVien) {
      errors.tenNhanVien = 'Tên nhân viên là bắt buộc';
    }
    if (!newEmployee.email) {
      errors.email = 'Email là bắt buộc';
    }
    if (!newEmployee.password && !isEditing) {
      errors.password = 'Mật khẩu là bắt buộc';
    }
    if (!newEmployee.IDRole) {
      errors.IDRole = 'Chức vụ là bắt buộc';
    }
    if (!newEmployee.ngaySinh) {
      errors.ngaySinh = 'Ngày sinh là bắt buộc';
    }

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createStaff(newEmployee);
      alert('Staff added successfully');
      fetchStaff(); // Refresh the staff list
      handleClose();
    } catch (err) {
      console.error('Failed to add staff:', err);
      alert(`Failed to add staff: ${err.message}`);
    }
  };

  const handleEditEmployee = async () => {
    if (!validateForm()) {
      return;
    }

    if (!selectedEmployeeId) {
      return;
    }

    try {
      await updateStaff(selectedEmployeeId, newEmployee);
      alert('Staff updated successfully');
      fetchStaff(); // Refresh the staff list
      handleClose();
    } catch (err) {
      console.error('Failed to update staff:', err);
      alert(`Failed to update staff: ${err.message}`);
    }
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, margin: 2 }}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Danh Sách Nhân Viên
          </Typography>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Thêm Nhân Viên Mới
          </Button>
        }
      />
      <CardContent>
        <TextField
          label="Tìm kiếm nhân viên"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell>Tên Nhân Viên</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
                <StyledTableCell>Hành Động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStaff.map((member, index) => (
                <StyledTableRow key={member._id}>
                  <CenteredTableCell>{page * rowsPerPage + index + 1}</CenteredTableCell>
                  <CenteredTableCell>{member.tenNhanVien}</CenteredTableCell>
                  <CenteredTableCell>{member.email}</CenteredTableCell>
                  <CenteredTableCell>
                    {member.isActive ? (
                      <Chip label="Hoạt động" color="success" />
                    ) : (
                      <Chip label="Không hoạt động" color="default" />
                    )}
                  </CenteredTableCell>
                  <CenteredTableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditClick(member)}
                      sx={{ marginRight: 1 }}
                    >
                      Chỉnh Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(member._id)}
                    >
                      Xóa
                    </Button>
                  </CenteredTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStaff.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên Mới'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Vui lòng điền thông tin nhân viên.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Tên Nhân Viên"
              type="text"
              fullWidth
              variant="outlined"
              value={newEmployee.tenNhanVien}
              onChange={(e) => setNewEmployee({ ...newEmployee, tenNhanVien: e.target.value })}
              error={!!formErrors.tenNhanVien}
              helperText={formErrors.tenNhanVien}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              margin="dense"
              label="Ngày Sinh"
              type="date"
              fullWidth
              variant="outlined"
              value={newEmployee.ngaySinh}
              onChange={(e) => setNewEmployee({ ...newEmployee, ngaySinh: e.target.value })}
              error={!!formErrors.ngaySinh}
              helperText={formErrors.ngaySinh}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="dense" error={!!formErrors.IDRole}>
              <InputLabel>Chức vụ</InputLabel>
              <Select
                value={newEmployee.IDRole}
                onChange={(e) => setNewEmployee({ ...newEmployee, IDRole: e.target.value })}
                label="Chức vụ"
              >
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.tenVaiTro}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.IDRole && <Typography color="error">{formErrors.IDRole}</Typography>}
            </FormControl>
            <FormControl fullWidth margin="dense">
              <Typography component="div">Trạng thái hoạt động</Typography>
              <Switch
                checked={newEmployee.isActive}
                onChange={(e) => setNewEmployee({ ...newEmployee, isActive: e.target.checked })}
                color="primary"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={isEditing ? handleEditEmployee : handleAddEmployee} color="primary">
              {isEditing ? 'Cập Nhật' : 'Lưu'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Xác Nhận Xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc chắn muốn xóa nhân viên này?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Hủy
            </Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
