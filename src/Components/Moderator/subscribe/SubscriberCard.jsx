// SubscriberCard.jsx
import React from 'react';
import { Card, CardContent, Avatar, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SubscriberCard({ subscriber, onDelete }) {
    return (
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 1, padding: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {subscriber.username ? subscriber.username.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {subscriber.username || "Unknown Username"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: {subscriber.email || "No email provided"}
                </Typography>
            </CardContent>
            <IconButton edge="end" color="primary" onClick={() => onDelete(subscriber.id)}>
                <DeleteIcon />
            </IconButton>
        </Card>
    );
}
