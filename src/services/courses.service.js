import axios from "axios";
import authService from "./auth.service.js";
const API_URL = "http://localhost:8000/api/v1/courses";
const API_BASE_URL = "http://localhost:8000/api/v1/lessons";

const create = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании курса:", error);
        throw error;
    }
};


const getSubscribedCourses = (userId) => {
    console.log(`Fetching subscribed courses for courseId: ${userId}`);
    return axios.get(`${API_URL}/${userId}/subscribed-courses`, {
        headers: {
            "Accept": "*/*"
        }
    })
        .then(response => {
            console.log("Subscribed courses retrieved successfully:", response.data);
            return response;
        })
        .catch(error => {
            console.error("Error fetching subscribed courses:", error);
            throw error;
        });
};


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


// Получение всех курсов
const getAll = async () => {
    console.log(`Ayoooom`);
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Ошибка при получении курсов:", error);
        throw error;
    }
};


const getCourseById = async (id) => {

    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении курса с ID ${id}:`, error);
        throw error;
    }
};

const getUserModuleById = async (moduleId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/module/${moduleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching module details for module ID ${moduleId}:`, error);
        throw error;
    }
};


const CoursesService = {
    create,
    getAll,
    getSubscribedCourses,
    getCurrentUser,
    getCourseById,
    getUserModuleById
};

export default CoursesService;

