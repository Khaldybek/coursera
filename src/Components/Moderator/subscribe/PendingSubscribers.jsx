import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, Avatar, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ModeratorCourses from '../../../services/moderator.courses';

export default function PendingSubscribers() {
    const { courseId } = useParams();
    const location = useLocation();
    const courseData = location.state?.courseData || {};
    const [pendingSubscribers, setPendingSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPendingSubscribers = async () => {
            try {
                const data = await ModeratorCourses.fetchPendingSubscribers(courseId);
                setPendingSubscribers(data || []);
            } catch (error) {
                console.error("Error loading pending subscribers:", error);
                setPendingSubscribers([]);
            } finally {
                setLoading(false);
            }
        };

        loadPendingSubscribers();
    }, [courseId]);

    const handleApprove = async (requestId) => {
        try {
            await ModeratorCourses.approveSubscriber(courseId, requestId);
            setPendingSubscribers((prev) => prev.filter((subscriber) => subscriber.id !== requestId));
            alert("Subscriber approved successfully.");
        } catch (error) {
            console.error("Error approving subscriber:", error);
            alert("Failed to approve subscriber.");
        }
    };

    const handleReject = async (requestId) => {
        try {
            await ModeratorCourses.rejectSubscriber(courseId, requestId);
            setPendingSubscribers((prev) => prev.filter((subscriber) => subscriber.id !== requestId));
            alert("Subscriber rejected successfully.");
        } catch (error) {
            console.error("Error rejecting subscriber:", error);
            alert("Failed to reject subscriber.");
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
                    Запрос курса {courseData.name || "Unnamed Course"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Компания: {courseData.companyName || "No company specified"}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Создано в: {courseData.createAt || "No creation date"}
                </Typography>
            </Box>
            {pendingSubscribers.length > 0 ? (
                <Grid container spacing={2} justifyContent="center">
                    {pendingSubscribers.map((subscriber) => (
                        <Grid item xs={12} key={subscriber.id}>
                            <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 1, padding: 2 }}>
                                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                    {subscriber.username ? subscriber.username.charAt(0).toUpperCase() : '?'}
                                </Avatar>
                                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                                    <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                                        {subscriber.username || "Unknown Username"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Email: {subscriber.email || "No email provided"}
                                    </Typography>
                                </CardContent>
                                <IconButton color="primary" onClick={() => handleApprove(subscriber.requestId)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleReject(subscriber.requestId)}>
                                    <CloseIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box textAlign="center" p={3}>No pending subscribers found for this course.</Box>
            )}
        </Box>
    );
}
