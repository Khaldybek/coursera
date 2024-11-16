import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Box, Card, CardContent, Typography, Button } from "@mui/material";
import { LockOutlined } from '@ant-design/icons'; // Импортируем иконку LockOutlined
import CourseService from "../../services/courses.service.js";
import AllCoursItem from "./AllCoursItem";

const AllCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        CourseService.getAll()
            .then(response => {
                setCourses(response || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/all-courses/${courseId}`);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f5f7', width: "100%", margin: '0', height: "100vh" }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress size={50} color="primary" />
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {Array.isArray(courses) && courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                            <Card sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                backgroundColor: 'white',
                                position: 'relative' // Для позиционирования иконки поверх
                            }}>
                                {/* Иконка блокировки, будет отображаться всегда */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    borderRadius: '50%',
                                    padding: 1
                                }}>
                                    <LockOutlined style={{ color: 'white' }} />
                                </Box>

                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {course.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                        {course.description.substring(0, 100)}...
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ textTransform: 'none', borderRadius: 2 }}
                                        onClick={() => handleCourseClick(course.id)}
                                    >
                                        Перейти к курсу
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default AllCourse;
