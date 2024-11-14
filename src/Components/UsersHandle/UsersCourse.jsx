import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import CourseService from "../../services/courses.service.js";
import UserCoursItem from "./UserCoursItem"; // Import the UserCoursItem component

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
                <Grid container spacing={4} justifyContent="center"> {/* Increase spacing */}
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
        </div>
    );
};

export default UsersCourse;
