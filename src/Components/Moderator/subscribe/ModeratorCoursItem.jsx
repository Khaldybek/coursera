import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function ModeratorCoursItem({ data }) {
    const navigate = useNavigate();

    const handleLearnMoreClick = () => {
        navigate(`/subscribe/${data.id}`, { state: { courseData: data } });
    };

    return (
        <Card sx={{
            minWidth: 250,
            padding: 2,
            transition: '0.3s',
            borderRadius: 2,
            backgroundColor: '#ffffff',
            '&:hover': {
                boxShadow: 8,
                backgroundColor: '#ffffff',
            },
        }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {data.companyName || "No company specified"}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                    Created At: {data.createAt || "No creation date"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleLearnMoreClick}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
