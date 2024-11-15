import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function ModeratorNavbar({ onTabChange }) {
    return (
        <AppBar position="static" sx={{ bgcolor: "#ffffff", color: "#000" }} elevation={1}>
            <Toolbar>
                <Box display="flex" width="100%">
                    <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => onTabChange('subscribers')} // Use onTabChange for 'subscribers'
                        sx={{
                            paddingRight: "12px",
                            '&:hover': {
                                color: "#17568c",
                                cursor: 'pointer',
                            },
                        }}
                    >
                        Подписчики
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => onTabChange('pending-subscribers')} // Use onTabChange for 'pending-subscribers'
                        sx={{
                            '&:hover': {
                                color: "#17568c",
                                cursor: 'pointer',
                            },
                        }}
                    >
                        Запросы
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
