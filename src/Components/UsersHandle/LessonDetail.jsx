import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonService from "../../services/lesson.service.js";
import { Box, Typography, CircularProgress, Avatar, Divider, Fab, Button } from "@mui/material";
import SampleImage from "../../Style/imeg/640px-Toydaria2.jpg"; // Placeholder image
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const LessonDetail = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const fetchLessonData = async () => {
            setLoading(true);
            try {
                const topicsData = await LessonService.getTopicsByLesson(lessonId);
                setTopics(topicsData);
                setLesson({ name: "Lesson Name Placeholder" }); // Replace with actual lesson data if available
            } catch (err) {
                console.error("Error fetching lesson details:", err);
                setError("Unable to load lesson details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchLessonData();

        // Scroll event listener to show/hide scroll-to-top button
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lessonId]);

    const handleGoBack = () => navigate(-1);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    return (
            <>
        <Box sx={{ padding: 4, maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 3, color: 'primary.main', borderColor: 'primary.main' }}>
                Назад
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={SampleImage} sx={{ width: 70, height: 70, mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {lesson.lessonName ? lesson.lessonName : "Lesson Details"}
                </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Below are the topics related to this lesson:
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box>
                {topics.map((topic) => (
                    <Box key={topic.id} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {topic.name || "Untitled Topic"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                            {topic.title || "No additional title provided"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {topic.description || "Здесь пусто"}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Scroll-to-top button */}
            {showScrollButton && (
                <Fab
                    color="primary"
                    aria-label="scroll to top"
                    onClick={scrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <ArrowUpwardIcon />
                </Fab>
            )}
        </Box>
                </>
    );
};

export default LessonDetail;
