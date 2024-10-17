import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { API_BASE_URL } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { registerEmployee } from 'src/services/auth';
import { getRoles } from 'src/services/roles';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [roles, setRoles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    tenNhanVien: '',
    email: '',
    password: '',
    IDRole: '',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();

        const formattedData = data.map((user: any) => ({
          id: user._id,
          name: user.tenNhanVien,
          email: user.email,
          role: user.IDRole.tenVaiTro,
          status: 'active', // Bạn có thể cập nhật trạng thái nếu có

          avatarUrl: '/assets/images/avatar/avatar-1.webp', // Bạn có thể cập nhật URL ảnh đại diện nếu có
          isVerified: true, // Bạn có thể cập nhật trạng thái xác thực nếu có
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleAddEmployee = async () => {
    try {
      const newEmployeeData = await registerEmployee(
        newEmployee.tenNhanVien,
        newEmployee.email,
        newEmployee.password,
        newEmployee.IDRole
      );
      console.log('New Employee:', newEmployeeData);
      // Cập nhật danh sách nhân viên sau khi thêm mới
      setUsers((prevUsers) => [...prevUsers, newEmployeeData]);
      setOpen(false); // Đóng popup sau khi thêm nhân viên
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Bảng nhân viên
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleClickOpen}
        >
          Thêm nhân viên
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên nhân viên"
            name="tenNhanVien"
            value={newEmployee.tenNhanVien}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={newEmployee.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Vai trò"
            name="IDRole"
            value={newEmployee.IDRole}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {roles.map((role: any) => (
              <MenuItem key={role._id} value={role._id}>
                {role.tenVaiTro}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAddEmployee} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Tên nhân viên' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Vai trò' },
                  { id: 'isVerified', label: 'Xác thực', align: 'center' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: '', label: 'Hành động' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
