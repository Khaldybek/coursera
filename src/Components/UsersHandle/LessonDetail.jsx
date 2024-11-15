import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonService from "../../services/lesson.service.js";
import { Box, Typography, CircularProgress, Avatar, Divider, Fab, Button } from "@mui/material";
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
                const [lessonResponse, topicsResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/v1/lessons/${lessonId}`).then((res) => res.json()),
                    fetch(`http://localhost:8000/api/topics/by-lesson/${lessonId}`).then((res) => res.json())
                ]);
                setLesson(lessonResponse);
                setTopics(topicsResponse);
            } catch (err) {
                setError("Не удалось загрузить данные об уроке. Попробуйте позже.");
            } finally {
                setLoading(false);
            }
        };
        fetchLessonData();

        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lessonId]);

    const handleGoBack = () => navigate(-1);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <Box sx={{ width: '100%', padding: 3, backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
            <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 3, color: '#007BFF', borderColor: '#007BFF' }}>
                Назад
            </Button>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 4 }}>{error}</Typography>
            ) : (
                <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar src={lesson.imageUrl || "default-image.jpg"} sx={{ width: 80, height: 80, mr: 3 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                            {lesson.name || "Название урока"}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                        {lesson.description || "Описание урока отсутствует."}
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Typography variant="h5" sx={{ fontWeight: 'medium', color: '#333', mb: 2 }}>
                        Темы урока
                    </Typography>
                    {topics.map((topic) => (
                        <Box
                            key={topic.id}
                            onClick={() => navigate(`/topic/${topic.id}`)}
                            sx={{
                                mb: 3,
                                padding: 2,
                                backgroundColor: '#f9fafb',
                                borderRadius: 2,
                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                                cursor: 'pointer'  // Добавляем указатель, чтобы показать, что элемент кликабельный
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#007BFF' }}>
                                {topic.name || "Без названия"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                {topic.description || "Описание темы отсутствует."}
                            </Typography>
                        </Box>
                    ))}


                    {showScrollButton && (
                        <Fab
                            color="primary"
                            aria-label="scroll to top"
                            onClick={scrollToTop}
                            sx={{
                                position: 'fixed',
                                bottom: 16,
                                right: 16,
                                backgroundColor: '#007BFF',
                                '&:hover': { backgroundColor: '#0056b3' },
                            }}
                        >
                            <ArrowUpwardIcon />
                        </Fab>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default LessonDetail;
