import React from 'react';
import { Box } from '@mui/material';

import { Settings } from '../Settings';

export const Header = ({ narrow }: { narrow: boolean }) => {
  return (
    <Box
      sx={{
        height: '52px',
        display: 'flex',
        bgcolor: 'action.disabledBackground',
        overflow: 'auto',
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: '36px' }}></Box>
      <Settings narrow={narrow} />
    </Box>
  );
};
