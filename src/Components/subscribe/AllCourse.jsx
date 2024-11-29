import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import {LockOutlined} from "@ant-design/icons";
import CourseService from "../../services/courses.service.js";
import SampleImage from "../../Style/imeg/2bf1422598e3129ec9052c560640d366.jpg";
import {fetchPresignedCourseUrls} from "../../services/topic.service.js";

const AllCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modulesWithUrls, setModulesWithUrls] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log("Fetching courses...");
                const response = await CourseService.getAll();
                console.log("Courses response:", response);

                setCourses(response || []);

                if (!Array.isArray(response)) {
                    console.error("Error: response is not an array", response);
                    return;
                }

                const coursesWithUrlsArray = await Promise.all(
                    response.map(async (course) => {
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

                console.log("Completed fetching all course URLs:", coursesWithUrls);
                setModulesWithUrls(coursesWithUrls);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
                console.log("Finished loading courses.");
            }
        };


        fetchCourses();
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
                                    <Box sx={{position: "absolute", top: 10, right: 10}}>
                                        <Tooltip title="Курс заблокирован">
                                            <LockOutlined style={{color: "#d32f2f", fontSize: "1.5rem"}}/>
                                        </Tooltip>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        alt={course.name}
                                        image={modulesWithUrls?.[course.id]?.files?.[0]?.downloadUrl || SampleImage}
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
                                            <Avatar sx={{bgcolor: "primary.main", mr: 2}}>
                                                {course.companyName.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Typography variant="body2" sx={{color: "text.secondary"}}>
                                                {course.companyName}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{color: "text.secondary", display: "block", mb: 2}}
                                        >
                                            Дата создания: {new Date(course.createAt).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{padding: 2}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{textTransform: "none", borderRadius: 2}}
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
