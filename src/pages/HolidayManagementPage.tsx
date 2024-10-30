// src/pages/HolidayManagementPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface Holiday {
  date: string;
  description: string;
}

const initialHolidays: Holiday[] = [
  { date: '2023-01-01', description: 'Tết Dương lịch' },
  { date: '2023-04-30', description: 'Ngày Giải phóng miền Nam' },
  { date: '2023-05-01', description: 'Ngày Quốc tế Lao động' },
  { date: '2023-09-02', description: 'Ngày Quốc khánh' },
];

export default function HolidayManagementPage() {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [open, setOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Holiday>({ date: '', description: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddHoliday = () => {
    setHolidays([...holidays, newHoliday]);
    setNewHoliday({ date: '', description: '' });
    handleClose();
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý ngày nghỉ lễ
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Thêm ngày nghỉ lễ
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardHeader title="Danh sách ngày nghỉ lễ" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Mô tả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holidays.map((holiday, index) => (
                  <TableRow key={index}>
                    <TableCell>{holiday.date}</TableCell>
                    <TableCell>{holiday.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm ngày nghỉ lễ</DialogTitle>
        <DialogContent>
          <TextField
            label="Ngày"
            type="date"
            value={newHoliday.date}
            onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mô tả"
            value={newHoliday.description}
            onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAddHoliday} color="primary" variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
