import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from "../../services/courses.service.js";
import Images from "../../Style/imeg/недоступно.png"; // Ensure this path is correct

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

    return (
        <Box sx={{ padding: 4, maxWidth: '900px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>{course.name}</Typography>
            <Typography variant="body1" paragraph>{course.description}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Company: {course.companyName}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Created on: {course.createAt}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Moderator ID: {course.moderatorId}</Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Modules</Typography>
            {course.modules && course.modules.length > 0 ? (
                <Box>
                    {course.modules.map((module, index) => (
                        <Card key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            boxShadow: 1,
                            borderRadius: 2,
                            padding: '8px 16px',
                        }}>
                            <Box
                                component="img"
                                src={Images}
                                alt="Недоступен"
                                sx={{
                                    width: 150,
                                    height: 30,
                                    marginRight: 2,
                                    backgroundColor: '#ffffff',
                                    color: '#f6f6f6',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                            <CardContent sx={{ padding: 0 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{`Модуль ${index + 1}. ${module.name}`}</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{module.description}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No modules available</Typography>
            )}

            <Button variant="contained" color="secondary" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
                Back
            </Button>
        </Box>
    );
};

export default CourseDetail;
