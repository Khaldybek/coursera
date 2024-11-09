import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/courses.service.js";
import UserCoursItem from "./UserCoursItem.jsx";

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



    return (
        <div className="courses-container">
            {loading ? (
                <CircularProgress size={50} />
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {courses.map((course, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <UserCoursItem data={course} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default UsersCourse;
