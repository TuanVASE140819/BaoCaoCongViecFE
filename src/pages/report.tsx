import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { fetchEmployeeReport, createReport, updateReport } from 'src/services/reportService';

// Component DateSelector: Chọn ngày
function DateSelector({ selectedDate, onDateChange }: { selectedDate: string; onDateChange: any }) {
  return (
    <TextField
      label="Chọn ngày"
      type="date"
      value={selectedDate}
      onChange={onDateChange}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  );
}

// Component ReportInput: Tạo input cho từng báo cáo
function ReportInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <TextField
      label={label}
      multiline
      rows={4}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      sx={{ mb: 3 }}
    />
  );
}

// Component ReportCard: Chứa phần báo cáo
function ReportCard({
  todayReport,
  setTodayReport,
  tomorrowReport,
  setTomorrowReport,
}: {
  todayReport: string;
  setTodayReport: any;
  tomorrowReport: string;
  setTomorrowReport: any;
}) {
  return (
    <Card>
      <CardHeader title="Báo cáo công việc" />
      <CardContent>
        <ReportInput
          label="Báo cáo hôm nay"
          value={todayReport}
          onChange={(e) => setTodayReport(e.target.value)}
        />
        <ReportInput
          label="Kế hoạch cho ngày mai"
          value={tomorrowReport}
          onChange={(e) => setTomorrowReport(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [todayReport, setTodayReport] = useState('');
  const [tomorrowReport, setTomorrowReport] = useState('');
  const [reportId, setReportId] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const fetchReport = useCallback(
    async (date: string) => {
      try {
        const report = await fetchEmployeeReport(user._id, date);
        if (report.length > 0) {
          setTodayReport(report[0].noiDungHomNay.replace(/<br \/>/g, '\n'));
          setTomorrowReport(report[0].noiDungDuKienNgayMai.replace(/<br \/>/g, '\n'));
          setReportId(report[0]._id); // Lưu lại ID của báo cáo
        } else {
          setTodayReport('');
          setTomorrowReport('');
          setReportId(null);
        }
      } catch (error) {
        console.error('Failed to fetch report:', error);
      }
    },
    [user._id]
  );

  useEffect(() => {
    fetchReport(selectedDate);
  }, [selectedDate, fetchReport]);

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const handleSave = async () => {
    console.log('Save button clicked');
    console.log('Báo cáo hôm nay:', todayReport);
    console.log('Kế hoạch ngày mai:', tomorrowReport);

    const reportData = {
      ngayBaoCao: selectedDate,
      noiDungHomNay: todayReport.replace(/\n/g, '<br />'),
      noiDungDuKienNgayMai: tomorrowReport.replace(/\n/g, '<br />'),
      IDnhanVien: user._id,
    };

    try {
      if (reportId) {
        await updateReport(reportId, reportData);
      } else {
        await createReport(reportData);
      }
      alert('Báo cáo đã được lưu thành công!');
      fetchReport(selectedDate); // Fetch lại dữ liệu sau khi lưu báo cáo thành công
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi khi lưu báo cáo.');
    }

    setTodayReport('');
    setTomorrowReport('');
  };

  const handleClear = () => {
    setTodayReport('');
    setTomorrowReport('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Báo cáo công việc
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
        </Grid>
        <Grid item xs={12}>
          <ReportCard
            todayReport={todayReport}
            setTodayReport={setTodayReport}
            tomorrowReport={tomorrowReport}
            setTomorrowReport={setTomorrowReport}
          />
        </Grid>
      </Grid>
      <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleClear} sx={{ mr: 2 }}>
          Xóa báo cáo
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Lưu báo cáo
        </Button>
      </CardActions>
    </Box>
  );
}
