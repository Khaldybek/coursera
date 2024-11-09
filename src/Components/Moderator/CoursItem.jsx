import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CoursItem({data}) {
    return (
        <Card sx={{
            minWidth: 200,
            transition: '0.3s',
            '&:hover': {
                boxShadow: 6,
            },
        }}>
            <CardContent>
                <Typography gutterBottom sx={{  fontSize: 14 }}>
                    {data.name}
                </Typography>
                <Typography variant="body2">
                    {data.companyName}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize:13 }}>{data.createAt}</Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}