// src/services/moderator.courses.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/moderator";

const getCoursesByModeratorId = (moderatorId) => {
    return axios.get(`${API_URL}/moderators/${moderatorId}/courses`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching courses:", error);
            throw error;
        });
};

const approveSubscriber = (courseId, requestId) => {
    return axios.post(`${API_URL}/${courseId}/approve-request/${requestId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error approving subscriber:", error);
            throw error;
        });
};

const rejectSubscriber = (courseId, requestId) => {
    return axios.post(`${API_URL}/${courseId}/reject-request/${requestId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error rejecting subscriber:", error);
            throw error;
        });
};


const fetchSubscribers = (courseId) => {
    return axios.get(`${API_URL}/${courseId}/all/subscribers`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching subscribers:", error);
            throw error;
        });
};

const removeSubscriber = (courseId, userId) => {
    const url = `${API_URL}/${courseId}/remove-subscriber/${userId}`;
    console.log("Sending DELETE request to:", url);  // Log the full URL for verification
    return axios.delete(url)
        .then(response => response.data)
        .catch(error => {
            console.error("Error removing subscriber:", error);
            throw error;
        });
};


const fetchPendingSubscribers = (courseId) => {
    return axios.get(`${API_URL}/courses/${courseId}/pending-subscribers`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching pending subscribers:", error);
            throw error;
        });
};

const ModeratorCourses = {
    getCoursesByModeratorId,
    approveSubscriber,
    rejectSubscriber,
    fetchPendingSubscribers,
    removeSubscriber,
    fetchSubscribers
};

export default ModeratorCourses;
