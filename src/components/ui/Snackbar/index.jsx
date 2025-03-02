import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarColors({ message, open, onClose, color = 'success', variant = 'soft' }) {
  return (
    <Snackbar
      autoHideDuration={4000}
      open={open}
      variant={variant}
      color={color}
      onClose={onClose}
    >
      {message}
    </Snackbar>
  );
}
