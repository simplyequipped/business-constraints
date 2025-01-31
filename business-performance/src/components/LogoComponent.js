import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Link } from 'react-router';
import '@fontsource/dancing-script';

export default function LogoComponent() {
    const theme = useTheme();

    return (
        <Typography variant='h2' sx={{fontFamily: 'Dancing Script, cursive', textDecoration: 'none'}} color={theme.palette.customColors['green']} component={Link} to='/'>
            Sharp
        </Typography>
    );
}