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
import { useRoles } from 'src/hooks/useRoles';
import { styled } from '@mui/material/styles';
import { Iconify } from './iconify';

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

export function RolesList() {
  const { roles, loading, error } = useRoles();

  const handleAddRole = () => {
    console.log('Add Role button clicked');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, margin: 2 }}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Danh Sách Chức Vụ
          </Typography>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mdi:plus" />}
            onClick={handleAddRole}
            sx={{ marginLeft: 1, borderRadius: 1 }}
          >
            Thêm Chức Vụ
          </Button>
        }
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell>Tên Vai Trò</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, index) => (
                <StyledTableRow key={role._id}>
                  <CenteredTableCell>{index + 1}</CenteredTableCell>
                  <CenteredTableCell>{role.tenVaiTro}</CenteredTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
