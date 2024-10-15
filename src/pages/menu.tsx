import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';

export default function MenuPage() {
  return (
    <>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <Box>
        <Typography variant="h4">Menu Page</Typography>
        {/* Nội dung của trang menu */}
      </Box>
    </>
  );
}
