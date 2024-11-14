import React, { useEffect, useState, useMemo } from 'react';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Typography, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from "../../services/courses.service.js";
import SampleImage from "../../Style/imeg/640px-Toydaria2.jpg"; // Placeholder image

const ModuleDetailLesson = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const response = await CourseService.getUserModuleById(moduleId);
                if (Array.isArray(response) && response.length > 0) {
                    setLessons(response); // Store the entire array of lessons
                } else {
                    setLessons([]);
                }
            } catch (err) {
                console.error("Error fetching module details:", err);
                setError("Unable to load module details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [moduleId]);

    const handleGoBack = () => navigate(-1);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    if (lessons.length === 0) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6">No lessons found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 3, color: 'primary.main', borderColor: 'primary.main' }}>
                Назад
            </Button>
            <Grid container spacing={3}>
                {lessons.map(lesson => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={lesson.id}>
                        <LessonCard lesson={lesson} navigate={navigate} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const LessonCard = ({ lesson, navigate }) => {
    const lessonPath = useMemo(() => `/lesson/${lesson.id}`, [lesson.id]);

    const handleButtonClick = () => {
        navigate(lessonPath);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 1, borderRadius: 3, overflow: 'hidden', backgroundColor: '#fff' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#f5f7fa' }}>
                <Avatar src={SampleImage} sx={{ width: 50, height: 50, mr: 2 }} />
                <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lesson.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                        {lesson.moduleName} • {lesson.level || "N/A"} уровень
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#f4b400', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                        <strong>⭐⭐⭐⭐⭐</strong> 4.5
                    </Typography>
                </Box>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '0.9rem',
                        color: '#333',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {lesson.description}
                </Typography>
            </CardContent>

            {/* Action Button */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#45A049'
                        },
                        borderRadius: 3,
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        color: '#fff'
                    }}
                    onClick={handleButtonClick}
                >
                    ОТКРЫТА
                </Button>
            </Box>
        </Card>
    );
};

export default ModuleDetailLesson;
