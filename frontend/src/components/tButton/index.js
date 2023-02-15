import React from 'react';
import { Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import shadows from '@mui/material/styles/shadows';

const FirebaseButton = props => {
  const theme = useTheme();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    root: {
      borderRadius: 8,
    },
    text: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    contained: {
      boxShadow: 'none',
      '&$focusVisible': {
        boxShadow: shadows[0],
      },
      '&:active': {
        boxShadow: shadows[0],
      },
    },
    containedPrimary: {
      backgroundColor: '#039be5',
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: '#0388ca',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: '#0388ca',
        },
      },
    },
    label: {
      textTransform: 'none',
      letterSpacing: '0.5px',
      fontWeight: 500,
    },
  }));
  return <ColorButton />;
};

export default FirebaseButton;