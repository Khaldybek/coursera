import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserCoursItem = ({ data, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                boxShadow: 4,
                padding: 2,
                width: 300,
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                },
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                margin: '50px 50px',
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1c1129' }}>
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {data.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCoursItem;
