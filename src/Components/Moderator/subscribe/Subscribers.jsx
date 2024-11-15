import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CircularProgress, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeratorCourses from '../../../services/moderator.courses';

export default function Subscribers() {
    const { courseId } = useParams();
    const location = useLocation();
    const courseData = location.state?.courseData || {};
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubscribers = async () => {
            try {
                const data = await ModeratorCourses.fetchSubscribers(courseId);
                setSubscribers(data || []);
            } catch (error) {
                console.error("Error loading subscribers:", error);
                setSubscribers([]);
            } finally {
                setLoading(false);
            }
        };

        loadSubscribers();
    }, [courseId]);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this subscriber?") &&
            window.confirm("Please confirm again to delete this subscriber.")) {
            try {
                await ModeratorCourses.removeSubscriber(courseId, userId);
                setSubscribers((prevSubscribers) =>
                    prevSubscribers.filter((subscriber) => subscriber.id !== userId)
                );
                alert("Subscriber removed successfully.");
            } catch (error) {
                console.error("Error removing subscriber:", error);
                alert("Failed to remove subscriber.");
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={4} width="1000px" maxWidth="1000px" mx="auto" textAlign="center">
            <Box mb={4}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Подписчики курса {courseData.name || "Unnamed Course"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Компания: {courseData.companyName || "No company specified"}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Создано в: {courseData.createAt || "No creation date"}
                </Typography>
            </Box>

            {subscribers.length > 0 ? (
                <Box>
                    {subscribers.map((subscriber) => (
                        <Card key={subscriber.id} variant="outlined" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 2,
                            boxShadow: 1,
                            padding: 3,
                            width: '100%',
                            marginBottom: 2
                        }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                {subscriber.username ? subscriber.username.charAt(0).toUpperCase() : '?'}
                            </Avatar>
                            <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                                    {subscriber.username || "Unknown Username"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {subscriber.email || "No email provided"}
                                </Typography>
                            </CardContent>
                            <IconButton edge="end" color="primary" onClick={() => handleDelete(subscriber.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Box textAlign="center" p={3}>No subscribers found for this course.</Box>
            )}
        </Box>
    );
}
