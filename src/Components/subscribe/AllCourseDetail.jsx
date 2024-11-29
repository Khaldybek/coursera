import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, CardMedia, ButtonBase, CircularProgress } from '@mui/material';
import { message } from 'antd'; // Import message from antd
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from "../../services/courses.service.js";
import AllCourseService from "../../services/all.courses.service.js";
import authService from "../../services/auth.service.js";
import SampleImage from "../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg";
import { fetchPresignedCourseUrls } from "../../services/topic.service.js";

const AllCourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [modulesWithUrls, setModulesWithUrls] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await CourseService.getCourseById(courseId);
                setCourse(response);

                const topicsWithUrls = await fetchPresignedCourseUrls(response);
                setModulesWithUrls(topicsWithUrls);
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setIsLoading(false); // Stop loading when data is fetched
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (isLoading) {
        return <CircularProgress />; // Show loading indicator while fetching data
    }

    const handleApplicationSubmit = () => {
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.id) {
            AllCourseService.requestSubscription(courseId, currentUser.id)
                .then(() => {
                    message.success("Subscription request sent successfully", 3); // Success message with 3s duration
                })
                .catch(error => {
                    console.error("Error submitting application:", error);
                    message.error("Error submitting application", 3); // Error message with 3s duration
                });
        } else {
            message.warning("User not authorized", 3); // Warning message with 3s duration
        }
    };

    const courseImage = modulesWithUrls?.files?.[0]?.downloadUrl || SampleImage;

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
                        image={courseImage}
                        alt="Course Image"
                        sx={{ borderRadius: 10, width: '300px', height: '300px', boxShadow: 3 }}
                    />
                </Grid>

                <Grid item xs={12} md={7} sx={{ mt: { xs: 2, md: -1 } }}>
                    <Typography variant="h4" gutterBottom>{course.name}</Typography>
                    <Typography variant="body1" paragraph>{course.description}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Company: {course.companyName}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Created on: {course.createAt}</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplicationSubmit}
                        sx={{ mt: 3 }}
                    >
                        Подать заявку
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ mt: 10, mb: 10 }}>Modules</Typography>
            {course.modules && course.modules.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {course.modules.map((module, index) => (
                        <ButtonBase
                            key={index}
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
                                    backgroundColor: 'rgba(255, 230, 230, 0.8)',
                                    color: '#b71c1c',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    marginRight: 2,
                                    textTransform: 'uppercase',
                                    border: '1px solid #b71c1c'
                                }}
                            >
                                НЕДОСТУПЕН
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

export default AllCourseDetail;
