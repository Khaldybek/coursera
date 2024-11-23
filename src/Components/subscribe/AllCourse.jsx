import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CircularProgress,
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Tooltip,
} from "@mui/material";
import { LockOutlined } from "@ant-design/icons";
import CourseService from "../../services/courses.service.js";

const AllCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        CourseService.getAll()
            .then((response) => {
                setCourses(response || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/all-courses/${courseId}`);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "text.primary" }}
            >
                Доступные курсы
            </Typography>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                    <CircularProgress size={50} color="primary" />
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {Array.isArray(courses) &&
                        courses.map((course) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "100%",
                                        boxShadow: 4,
                                        borderRadius: 3,
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: 6,
                                        },
                                        backgroundColor: "#ffffff",
                                        position: "relative",
                                    }}
                                >
                                    <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                                        <Tooltip title="Курс заблокирован">
                                            <LockOutlined style={{ color: "#d32f2f", fontSize: "1.5rem" }} />
                                        </Tooltip>
                                    </Box>
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                mb: 2,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {course.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 2,
                                                color: "text.secondary",
                                                height: "48px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {course.description}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                            }}
                                        >
                                            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                                                {course.companyName.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                {course.companyName}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: "text.secondary", display: "block", mb: 2 }}
                                        >
                                            Дата создания: {new Date(course.createAt).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ padding: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ textTransform: "none", borderRadius: 2 }}
                                            onClick={() => handleCourseClick(course.id)}
                                        >
                                            Перейти к курсу
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            )}
        </Box>
    );
};

export default AllCourse;
