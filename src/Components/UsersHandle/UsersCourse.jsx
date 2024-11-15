import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Box } from "@mui/material";
import CourseService from "../../services/courses.service.js";
import UserCoursItem from "./UserCoursItem";

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
        <Box sx={{ padding: 4, minHeight: '100vh' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress size={40} />
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                            <UserCoursItem
                                data={course}
                                onClick={() => handleCourseClick(course.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default UsersCourse;
