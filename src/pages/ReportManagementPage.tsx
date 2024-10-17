import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { fetchReportsByDate } from 'src/services/reportService';
import { ReportList } from 'src/components/ReportList';
import 'src/styles/print.css';

export default function ReportManagementPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reports, setReports] = useState([]);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleFetchReports = useCallback(async () => {
    try {
      const fetchedReports = await fetchReportsByDate(selectedDate);
      const processedReports = fetchedReports.map((report: any) => ({
        ...report,
        noiDungHomNay: report.noiDungHomNay.replace(/\n/g, '<br />'),
        noiDungDuKienNgayMai: report.noiDungDuKienNgayMai.replace(/\n/g, '<br />'),
      }));
      setReports(processedReports);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  }, [selectedDate]);

  useEffect(() => {
    handleFetchReports();
  }, [handleFetchReports]);

  const handlePrint = () => {
    if (reportRef.current) {
      const printContent = reportRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload lại để đảm bảo giao diện không bị thay đổi sau khi in
    }
  };

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
        <Button variant="contained" color="secondary" onClick={handlePrint} sx={{ ml: 2 }}>
          In báo cáo
        </Button>
      </Box>

      {/* Khu vực sẽ được in */}
      <div ref={reportRef} className="print-container">
        <div className="print-header" style={{ textAlign: 'left' }}>
          <Typography variant="h5">Báo cáo công việc</Typography>
          <Typography variant="subtitle1">Ngày: {selectedDate}</Typography>
        </div>
        <ReportList reports={reports} />
      </div>
    </Box>
  );
}
