import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Box } from "@mui/material";
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
        <Box sx={{ padding: 4, minHeight: '100vh' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress size={40} />
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {Array.isArray(courses) && courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                            <AllCoursItem
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

export default AllCourse;
