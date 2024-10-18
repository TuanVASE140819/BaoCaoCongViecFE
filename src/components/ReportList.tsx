// src/components/ReportList.tsx
import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Report } from 'src/types/report';

type ReportListProps = {
  reports: Report[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'left',
}));

const CenteredTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'left',
}));

const LeftAlignedTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'left',
}));

export const ReportList: React.FC<ReportListProps> = ({ reports }) => (
  <TableContainer component={Paper}>
    <Table className="print-table">
      <TableHead>
        <TableRow>
          <StyledTableCell className="left-align">Nhân viên</StyledTableCell>
          <StyledTableCell>Báo cáo hôm nay</StyledTableCell>
          <StyledTableCell>Kế hoạch ngày mai</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report._id}>
            <LeftAlignedTableCell className="left-align">
              {report.IDnhanVien.tenNhanVien}
            </LeftAlignedTableCell>
            <CenteredTableCell>
              <div dangerouslySetInnerHTML={{ __html: report.noiDungHomNay }} />
            </CenteredTableCell>
            <CenteredTableCell>
              <div dangerouslySetInnerHTML={{ __html: report.noiDungDuKienNgayMai }} />
            </CenteredTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
