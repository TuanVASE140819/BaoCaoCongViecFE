import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [todayReport, setTodayReport] = useState('');
  const [tomorrowReport, setTomorrowReport] = useState('');

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const handleTodayReport = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const handleTomorrowReport = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleSave = () => {
    console.log('Save button clicked');
    console.log('Today Report:', todayReport);
    console.log('Tomorrow Report:', tomorrowReport);
    // Thêm logic lưu báo cáo ở đây
  };

  return (
    <>
      <div>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Work Report
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu
            </Button>
          </Box>
          <Card>
            <CardHeader title="Work Report" />
            <CardContent>
              <TextField
                label="Báo cáo hôm nay"
                multiline
                rows={4}
                value={todayReport}
                onChange={(e) => setTodayReport(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Báo cáo ngày mai"
                multiline
                rows={4}
                value={tomorrowReport}
                onChange={(e) => setTomorrowReport(e.target.value)}
                fullWidth
              />
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
}

export default ReportPage;
