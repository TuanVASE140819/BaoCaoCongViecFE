import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchBirthdays } from 'src/services/dashboardService';
import type { Employee } from 'src/types/employee';

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

// Hàm tạo lịch tháng
function generateCalendar(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendar: (number | null)[][] = [];
  let week: (number | null)[] = [];

  for (let i = 0; i < firstDay; i += 1) {
    week.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  if (week.length > 0) calendar.push([...week, ...Array(7 - week.length).fill(null)]);

  return calendar;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const TodayCell = styled(StyledTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  fontWeight: 'bold',
}));

export function CustomCalendar() {
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const year = date.getFullYear();
  const month = date.getMonth();
  const calendar = generateCalendar(year, month);
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchBirthdays(month + 1); // API expects 1-based month
        setEmployees(data);
        setLoading(false);
      } catch (fetchError: any) {
        setError(fetchError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  const handlePrevMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Map sinh nhật để dễ dàng kiểm tra
  const birthdayMap = new Map<number, string[]>();
  employees.forEach((employee) => {
    const birthday = new Date(employee.ngaySinh).getDate();
    if (!birthdayMap.has(birthday)) {
      birthdayMap.set(birthday, []);
    }
    birthdayMap.get(birthday)!.push(employee.tenNhanVien);
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Lịch Sinh Nhật Nhân Viên
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePrevMonth}>
          Tháng trước
        </Button>
        <Typography variant="h6">
          {months[month]} {year}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextMonth}>
          Tháng sau
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow>
              {daysOfWeek.map((day) => (
                <HeaderTableCell key={day}>{day}</HeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendar.map((week, i) => (
              <TableRow key={i}>
                {week.map((day, j) => {
                  const isToday =
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
                  const birthdays = birthdayMap.get(day!) || [];

                  return day ? (
                    <StyledTableCell
                      key={j}
                      sx={{
                        backgroundColor: j === 0 || j === 6 ? 'rgba(255, 87, 34, 0.1)' : 'inherit',
                      }}
                      as={isToday ? TodayCell : 'td'}
                    >
                      {day}
                      {birthdays.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          {birthdays.map((name, index) => (
                            <Typography key={index} variant="caption" display="block">
                              {name}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell key={j} />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Nhân viên có sinh nhật trong {months[month]}</Typography>
        <List>
          {employees.map((employee) => (
            <ListItem key={employee._id}>
              <ListItemText
                primary={employee.tenNhanVien}
                secondary={`Email: ${employee.email} | Ngày sinh: ${employee.ngaySinh}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
