import React, { useState, useEffect } from 'react';
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
  Chip,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  checkInTime: string;
  checkOutTime: string;
  notes?: string;
}

export default function AttendancePage() {
  const attendanceData = [
    {
      id: '001',
      employeeName: 'Nguyễn Văn A',
      date: '2023-05-01',
      checkIn: '-',
      checkOut: '-',
      status: 'Nghỉ phép',
    },
    // More rows here...
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bảng Chấm Công Tháng
      </Typography>

      {/* Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { label: 'Nghỉ phép', value: 34 },
          { label: 'Đi muộn', value: 29 },
          { label: 'Về sớm', value: 22 },
          { label: 'Đúng giờ', value: 34 },
          { label: 'Vắng mặt', value: 36 },
        ].map((metric) => (
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

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField label="Tháng" select sx={{ minWidth: 120 }}>
          {/* Add month options */}
          <MenuItem value="01">Tháng 1</MenuItem>
          <MenuItem value="02">Tháng 2</MenuItem>
          {/* Add more months */}
        </TextField>
        <TextField label="Tìm kiếm theo tên hoặc ID" sx={{ flex: 1, minWidth: 200 }} />
        <TextField label="Tất cả" select sx={{ minWidth: 120 }}>
          {/* Add filter options */}
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="late">Đi muộn</MenuItem>
          <MenuItem value="early">Về sớm</MenuItem>
          {/* Add more filters */}
        </TextField>
        <Button variant="contained">Tải dữ liệu</Button>
      </Box>

      {/* Attendance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên nhân viên</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Giờ vào</TableCell>
              <TableCell>Giờ ra</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.employeeName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor:
                        row.status === 'Đi muộn'
                          ? '#FFD700'
                          : row.status === 'Đúng giờ'
                            ? '#32CD32'
                            : row.status === 'Về sớm'
                              ? '#FFA500'
                              : '#FF4500',
                      color: '#fff',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined">Trang trước</Button>
        <Typography>Trang 1 / 16</Typography>
        <Button variant="contained">Trang sau</Button>
      </Box>
    </Box>
  );
}
