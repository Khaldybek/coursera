import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import springBootLogo from '../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg';
import {useNavigate} from "react-router-dom";

export default function UserCoursItem({ data }) {
    const navigate = useNavigate();

    const handleLearnMore = (courseId) => {
        navigate(`/my-courses/${courseId}`);
    };


    return (
        <Card sx={{
            minWidth: 250,
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            border: '1px solid #e0e0e0',
            transition: '0.3s',
            '&:hover': {
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                borderColor: '#bdb6b6',
            },
        }}>
            <CardContent sx={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
            }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <img src={springBootLogo} alt="Spring Boot Logo" width={40} height={40} style={{ marginRight: '12px', borderRadius: '50%' }} />
                    <Typography gutterBottom sx={{ fontSize: 24, fontWeight: 'bold' }}>
                        {data.name}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 15, mb: 1 }}>
                    {data.companyName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 12, mb: 1 }}>
                    Created on: {data.createAt}
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '16px', justifyContent: 'center' }}>
                <Button size="small" variant="contained" color="primary" onClick={() => handleLearnMore(data.id)} >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
