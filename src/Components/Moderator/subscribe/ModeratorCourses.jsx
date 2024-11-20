import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, CircularProgress, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ModeratorService from '../../../services/moderator.courses.js';
import AuthService from '../../../services/auth.service.js';
import ModeratorCoursItem from './ModeratorCoursItem';
import ModeratorNavbar from './ModeratorNavbar'; // Import the Navbar

export default function ModeratorCourses() {
    const moderator = AuthService.getCurrentUser();
    const moderatorId = moderator.id;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, [moderatorId]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await ModeratorService.getCoursesByModeratorId(moderatorId);
            setCourses(response);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!courses || courses.length === 0) {
        return <Box textAlign="center" p={3}>No courses found.</Box>;
    }

    return (
        <Box bgcolor="#ffffff">

            <Box bgcolor="#ffffff">
                <Typography variant="h4" align="center" color="primary" gutterBottom>
                    My Courses
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <ModeratorCoursItem data={course} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
