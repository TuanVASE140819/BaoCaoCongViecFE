import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { fetchReportsByDate } from 'src/services/reportService';
import { ReportList } from 'src/components/ReportList';

export default function ReportManagementPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reports, setReports] = useState([]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleFetchReports = useCallback(async () => {
    try {
      const fetchedReports = await fetchReportsByDate(selectedDate);
      setReports(fetchedReports);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  }, [selectedDate]);

  useEffect(() => {
    handleFetchReports();
  }, [handleFetchReports]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý báo cáo
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Chọn ngày"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleFetchReports}>
          Lấy báo cáo
        </Button>
      </Box>
      <ReportList reports={reports} />
    </Box>
  );
}
