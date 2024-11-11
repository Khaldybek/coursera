import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserCoursItem = ({ data, onClick }) => {
    return (
        <Card onClick={onClick} sx={{ cursor: 'pointer', boxShadow: 3, padding: 2 }}>
            <CardContent>
                <Typography variant="h6">{data.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCoursItem;
