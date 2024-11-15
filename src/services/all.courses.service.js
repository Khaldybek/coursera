import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/courses";

const getAll = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("API response:", response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};



const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getCourseById = (courseId) => {
    return axios.get(`${API_URL}/${courseId}`)
        .then(response => response.data);
};

const requestSubscription = async (courseId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/${courseId}/request-subscription`, null, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error("Error requesting subscription:", error);
        throw error;
    }
};


const CoursesService = {
    getAll,
    getCourseById,
    getCurrentUser,
    requestSubscription
};

export default CoursesService;

