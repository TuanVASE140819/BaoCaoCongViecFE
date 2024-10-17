import React, { useState } from 'react';
import { updateUser } from 'src/services/UserService';
import { Box, TextField, Button, Typography } from '@mui/material';

type UserUpdateFormProps = {
  userId: string;
  initialData: any;
};

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ userId, initialData }) => {
  const [userData, setUserData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(userId, userData);
      console.log('User updated successfully:', updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Update User</Typography>
      <TextField
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add other fields as necessary */}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default UserUpdateForm;
