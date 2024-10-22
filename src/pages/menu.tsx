// src/pages/menu.tsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useUser } from 'src/hooks/useUser';
import { menuConfig } from 'src/config/menuConfig';

function MenuPage() {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const accessibleMenuItems = menuConfig[user.IDRole.tenVaiTro] || [];

  return (
    <>
      <Box>
        <Typography variant="h4">Menu Page</Typography>
        <List>
          {accessibleMenuItems.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default MenuPage;
