import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import ImportExportIcon from '@mui/icons-material/ImportExport'; // Import icon

// Định nghĩa giao diện cho bản ghi chấm công
interface AttendanceRecord {
  STT: number;
  department: string;
  employeeId: string;
  employeeName: string;
  T9: number;
  T10: number;
  workingHoursT3: number;
  workingHoursT4: number;
  workingDaysNT: number;
  workingDaysCN: number;
  overtimeNT: number;
  overtimeCN: number;
  V: number;
  late: number;
  early: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const CenteredTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
}));

const AttendanceMetrics = () => {
  const metrics = [
    { label: 'Nghỉ phép', value: 34 },
    { label: 'Đi muộn', value: 29 },
    { label: 'Về sớm', value: 22 },
    { label: 'Đúng giờ', value: 34 },
    { label: 'Vắng mặt', value: 36 },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={2.4} key={metric.label}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{metric.label}</Typography>
              <Typography variant="h4">{metric.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const AttendanceTable = ({ data }: { data: AttendanceRecord[] }) => (
  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {[
            'STT',
            'Phòng ban',
            'Mã nhân viên',
            'Tên nhân viên',
            '9',
            '10',
            'Giờ công T3',
            'Giờ công T4',
            'Ngày công NT',
            'Ngày công CN',
            'Tăng ca NT',
            'Tăng ca CN',
            'V',
            'Trễ',
            'Sớm',
          ].map((header) => (
            <StyledTableCell key={header}>{header}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.STT}>
            {Object.values(row).map((value, index) => (
              <CenteredTableCell key={index}>{value}</CenteredTableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ImportDialog = ({
  open,
  onClose,
  fileData,
  onFileUpload,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  fileData: AttendanceRecord[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImport: () => void;
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
    <DialogTitle>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <ImportExportIcon sx={{ mr: 1 }} /> */}
        <Typography variant="h6">Import Thống Kê</Typography>
      </Box>
    </DialogTitle>
    <Divider />
    <DialogContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <input type="file" accept=".xlsx, .xls" onChange={onFileUpload} />
        <Tooltip title="Chọn tệp Excel để import">
          <IconButton color="primary" component="span">
            <i className="fas fa-file-upload" />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                'STT',
                'Phòng ban',
                'Mã nhân viên',
                'Tên nhân viên',
                '9',
                '10',
                'Giờ công T3',
                'Giờ công T4',
                'Ngày công NT',
                'Ngày công CN',
                'Tăng ca NT',
                'Tăng ca CN',
                'V',
                'Trễ',
                'Sớm',
              ].map((header) => (
                <StyledTableCell key={header}>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fileData.map((row) => (
              <TableRow key={row.STT}>
                {Object.values(row).map((value, index) => (
                  <CenteredTableCell key={index}>{value}</CenteredTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Vui lòng kiểm tra lại dữ liệu trước khi nhập.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Đóng</Button>
      <Button onClick={onImport} variant="contained">
        Nhập
      </Button>
    </DialogActions>
  </Dialog>
);

export default function AttendancePage() {
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<AttendanceRecord[]>([]);
  const [analyzedData, setAnalyzedData] = useState<AttendanceRecord[]>([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Adjust the range to start from the title row (e.g., row 4)
        const jsonData: AttendanceRecord[] = XLSX.utils.sheet_to_json(worksheet, {
          header: [
            'STT',
            'department',
            'employeeId',
            'employeeName',
            'T9',
            'T10',
            'workingHoursT3',
            'workingHoursT4',
            'workingDaysNT',
            'workingDaysCN',
            'overtimeNT',
            'overtimeCN',
            'V',
            'late',
            'early',
          ],
          range: 4, // Skip rows above the title row
        });

        // Filter out rows where STT is null or undefined
        const filteredData = jsonData.filter((row) => row.STT !== null && row.STT !== undefined);
        setFileData(filteredData);
        setAnalyzedData(filteredData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImport = async () => {
    try {
      console.log(fileData);
      handleClose();
    } catch (error) {
      console.error('Failed to import data:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bảng Chấm Công Tháng
      </Typography>
      <AttendanceMetrics />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField label="Tháng" select sx={{ minWidth: 120 }}>
          <MenuItem value="01">Tháng 1</MenuItem>
          <MenuItem value="02">Tháng 2</MenuItem>
        </TextField>
        <TextField label="Tìm kiếm theo tên hoặc ID" sx={{ flex: 1, minWidth: 200 }} />
        <TextField label="Tất cả" select sx={{ minWidth: 120 }}>
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="late">Đi muộn</MenuItem>
          <MenuItem value="early">Về sớm</MenuItem>
        </TextField>
        <Button variant="contained">Tải dữ liệu</Button>
        <Button variant="contained" onClick={handleClickOpen}>
          Import Thống Kê
        </Button>
      </Box>
      <AttendanceTable data={analyzedData} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined">Trang trước</Button>
        <Typography>Trang 1 / 16</Typography>
        <Button variant="contained">Trang sau</Button>
      </Box>
      <ImportDialog
        open={open}
        onClose={handleClose}
        fileData={fileData}
        onFileUpload={handleFileUpload}
        onImport={handleImport}
      />
    </Box>
  );
}
