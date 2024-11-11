import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Card, CardContent, Typography } from "@mui/material";
import CourseService from "../../services/courses.service.js";

const UsersCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = CourseService.getCurrentUser();
        if (user && user.id) {
            CourseService.getSubscribedCourses(user.id)
                .then(response => {
                    setCourses(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching subscribed courses:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/my-courses/${courseId}`);
    };

    return (
        <div className="courses-container">
            {loading ? (
                <CircularProgress size={50} />
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {courses.map((course, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    width: 300,
                                    height: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    boxShadow: 3,
                                    cursor: 'pointer',
                                    ':hover': { boxShadow: 6 },
                                }}
                                onClick={() => handleCourseClick(course.id)}
                            >
                                <CardContent sx={{ paddingRight: '9px'}}>
                                    <Typography padding={1} variant="h5">{course.name}</Typography>
                                    <Typography variant="h7" color="text.secondary">
                                        {course.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default UsersCourse;
