import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, CardMedia, ButtonBase } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from "../../services/courses.service.js";
import SampleImage from "../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg";

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        CourseService.getCourseById(courseId)
            .then(response => {
                setCourse(response);
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
            });
    }, [courseId]);

    if (!course) {
        return <Typography>Loading...</Typography>;
    }

    const handleModuleClick = (moduleId) => {
        navigate(`/course/${courseId}/module/${moduleId}`);
    };

    return (
        <Box sx={{ padding: 5, maxWidth: "100vw", width: "100%", margin: '0', backgroundColor: '#f9f9f9' }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(-1)}
                sx={{ mt: 3, mb: 4 }}
            >
                Back
            </Button>

            <Grid container spacing={1} alignItems="center">
                <Grid item margin={2} xs={12} sm={6} md={4} lg={3}>
                    <CardMedia
                        component="img"
                        image={SampleImage}
                        alt="Course Image"
                        sx={{ borderRadius: 10, width: '300px', boxShadow: 3 }}
                    />
                </Grid>

                <Grid item xs={12} md={7} sx={{ mt: { xs: 2, md: -1 } }}>
                    <Typography variant="h4" gutterBottom>{course.name}</Typography>
                    <Typography variant="body1" paragraph>{course.description}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Company: {course.companyName}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Created on: {course.createAt}</Typography>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ mt: 10, mb: 10 }}>Modules</Typography>
            {course.modules && course.modules.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {course.modules.map((module, index) => (
                        <ButtonBase
                            key={index}
                            onClick={() => handleModuleClick(module.id)}
                            sx={{
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 16px',
                                borderBottom: '1px solid #ddd',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                }
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 7, flex: '0 0 100px' }}>
                                {`Уровень ${index + 1}`}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#d4edda',
                                    color: '#155724',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    marginRight: 10,
                                    textTransform: 'uppercase',
                                }}
                            >
                                Доступно
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', flex: '1', marginRight: 2 }}>
                                {module.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', flex: '3' }}>
                                {module.description}
                            </Typography>
                        </ButtonBase>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No modules available</Typography>
            )}
        </Box>
    );
};

export default CourseDetail;
