import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
    Avatar,
    Tooltip,
} from "@mui/material";
import { UnlockOutlined } from "@ant-design/icons";
import CourseService from "../../services/courses.service.js";
import UserCoursItem from "./UserCoursItem";
import { fetchPresignedCourseUrls } from "../../services/topic.service.js";
import SampleImage from "../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg";

const UsersCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coursesWithUrls, setCoursesWithUrls] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const user = CourseService.getCurrentUser();
                if (user && user.id) {
                    const response = await CourseService.getSubscribedCourses(user.id);
                    setCourses(response.data);

                    const coursesWithUrlsArray = await Promise.all(
                        response.data.map(async (course) => {
                            try {
                                const result = await fetchPresignedCourseUrls(course);
                                return { id: course.id, files: result?.files || [] };
                            } catch (error) {
                                console.error(`Error fetching URLs for course ${course.name}:`, error);
                                return { id: course.id, files: [] };
                            }
                        })
                    );

                    const coursesWithUrls = coursesWithUrlsArray.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {});

                    setCoursesWithUrls(coursesWithUrls);
                }
            } catch (error) {
                console.error("Error fetching subscribed courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/my-courses/${courseId}`);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "text.primary" }}
            >
                Ваши подписки
            </Typography>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                    <CircularProgress size={50} color="primary" />
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {courses.length === 1 || courses.length === 2 ? (
                        // For one or two courses, display them in a single row.
                        <Grid container item xs={12} justifyContent="center" spacing={4}>
                            {courses.map((course) => (
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
                                            <Tooltip title="Курс открыт">
                                                <UnlockOutlined style={{ color: "#2fd332", fontSize: "1.5rem" }} />
                                            </Tooltip>
                                        </Box>

                                        <CardMedia
                                            component="img"
                                            alt={course.name}
                                            image={
                                                coursesWithUrls[course.id] && coursesWithUrls[course.id].files && coursesWithUrls[course.id].files[0]
                                                    ? coursesWithUrls[course.id].files[0].downloadUrl
                                                    : SampleImage
                                            }
                                            sx={{ height: 180, objectFit: 'cover', borderRadius: 2 }}
                                        />

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
                    ) : (
                        // When there are more than 2 courses, show them in multiple rows
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
                                        <Tooltip title="Курс открыт">
                                            <UnlockOutlined style={{ color: "#2fd332", fontSize: "1.5rem" }} />
                                        </Tooltip>
                                    </Box>

                                    <CardMedia
                                        component="img"
                                        alt={course.name}
                                        image={
                                            coursesWithUrls[course.id] && coursesWithUrls[course.id].files && coursesWithUrls[course.id].files[0]
                                                ? coursesWithUrls[course.id].files[0].downloadUrl
                                                : SampleImage
                                        }
                                        sx={{ height: 180, objectFit: 'cover', borderRadius: 2 }}
                                    />

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
                        ))
                    )}
                </Grid>
            )}
        </Box>
    );
};

export default UsersCourse;
