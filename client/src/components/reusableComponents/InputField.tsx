import { TextField } from '@mui/material';
import React, { useState } from 'react';

const InputField = () => {
  const [value, setValue] = useState('');
  return <TextField value={value} />;
};
