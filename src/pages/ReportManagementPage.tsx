import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { fetchReportsByDate } from 'src/services/reportService';
import { fetchNoteById, updateNoteById } from 'src/services/noteService';
import { ReportList } from 'src/components/ReportList';
import { Report } from 'src/types/report';
import 'src/styles/print.css';

export default function ReportManagementPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reports, setReports] = useState<Report[]>([]);
  const [note, setNote] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleFetchReports = useCallback(async () => {
    try {
      const fetchedReports: any = await fetchReportsByDate(selectedDate);

      const processedReports: Report[] = fetchedReports.map((report: any) => ({
        _id: report._id,
        ngayBaoCao: report.ngayBaoCao,
        noiDungHomNay: report.noiDungHomNay,
        noiDungDuKienNgayMai: report.noiDungDuKienNgayMai,
        IDnhanVien: report.IDnhanVien,
      }));

      setReports(processedReports);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  }, [selectedDate]);

  const handleFetchNote = useCallback(async () => {
    try {
      const noteId = '6711cd78e5071d35cd6c1174'; // Replace with dynamic ID if needed
      const fetchedNote = await fetchNoteById(noteId);
      setNote(fetchedNote.content); // Assuming the note has a 'content' field
    } catch (error) {
      console.error('Failed to fetch note:', error);
    }
  }, []);

  const handleUpdateNote = useCallback(async () => {
    try {
      const noteId = '6711cd78e5071d35cd6c1174'; // Replace with dynamic ID if needed
      const reportId = '60d5ec49f8d2b814c8a4d2b5'; // Replace with dynamic report ID if needed
      await updateNoteById(noteId, { content: note, reportId });
      console.log('Note updated successfully');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  }, [note]);

  useEffect(() => {
    handleFetchReports();
    handleFetchNote();
  }, [handleFetchReports, handleFetchNote]);

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

  const handleSaveNote = () => {
    handleUpdateNote();
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

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Ghi chú"
          multiline
          rows={4}
          value={note}
          onChange={handleNoteChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveNote}>
          Lưu ghi chú
        </Button>
      </Box>

      {/* Khu vực sẽ được in */}
      <div ref={reportRef} className="print-container">
        <Card
          sx={{ mb: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}
          className="print-only"
        >
          <CardContent>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {note}
            </Typography>
          </CardContent>
        </Card>
        <div className="print-header no-print" style={{ textAlign: 'left' }}>
          <Typography variant="h5">Báo cáo công việc</Typography>
          <Typography variant="subtitle1">Ngày: {selectedDate}</Typography>
        </div>
        <ReportList reports={reports} />
      </div>
    </Box>
  );
}
