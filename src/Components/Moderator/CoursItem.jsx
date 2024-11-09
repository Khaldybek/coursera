import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CoursItem({ data }) {
    const navigate = useNavigate();  // Hook to handle navigation

    const handleLearnMoreClick = () => {
        navigate(`/courses/${data.id}`);  // Navigate to the course details page
    };

    return (
        <Card sx={{
            minWidth: 200,
            transition: '0.3s',
            '&:hover': {
                boxShadow: 6,
            },
        }}>
            <CardContent>
                <Typography gutterBottom sx={{ fontSize: 14 }}>
                    {data.name}
                </Typography>
                <Typography variant="body2">
                    {data.companyName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{data.createAt}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleLearnMoreClick}>Learn More</Button>
            </CardActions>
        </Card>
    );
}
