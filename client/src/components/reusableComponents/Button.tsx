import React from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
interface Props {
  name: String;
}
const MUIButton: React.FC<Props> = ({ name }) => {
  return (
    <Button
      sx={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        borderRadius: '15px',
        background: 'transparent',
        padding: '.7rem 3rem',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',

        '&:hover': {
          boxShadow:
            '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        },
      }}
      size='large'
      color='inherit'>
      {name}
    </Button>
  );
};

export default MUIButton;
