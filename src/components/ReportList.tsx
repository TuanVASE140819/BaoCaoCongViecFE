import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type Report = {
  _id: string;
  ngayBaoCao: string;
  noiDungHomNay: string;
  noiDungDuKienNgayMai: string;
  IDnhanVien: {
    _id: string;
    tenNhanVien: string;
    email: string;
  };
};

type ReportListProps = {
  reports: Report[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const CenteredTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
}));

export const ReportList: React.FC<ReportListProps> = ({ reports }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Nhân viên</StyledTableCell>
          <StyledTableCell>Báo cáo hôm nay</StyledTableCell>
          <StyledTableCell>Kế hoạch ngày mai</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report._id}>
            <CenteredTableCell>{report.IDnhanVien.tenNhanVien}</CenteredTableCell>
            <CenteredTableCell>{report.noiDungHomNay}</CenteredTableCell>
            <CenteredTableCell>{report.noiDungDuKienNgayMai}</CenteredTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
