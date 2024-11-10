import axios from "axios";
import authService from "./auth.service.js";
const API_URL = "http://localhost:8000/api/v1/courses";

const create = async (name, description, companyName) => {
    try {
        const moderator=authService.getCurrentUser()
        const moderatorId= moderator.id;
        const response = await axios.post(API_URL, {
            name,
            description,
            companyName,
            moderatorId

        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании курса:", error);
        throw error;  // Пробрасываем ошибку для обработки на уровне компонентов
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
    try {
        const response = await axios.get(API_URL);
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

const CoursesService = {
    create,
    getAll,
    getSubscribedCourses,
    getCurrentUser,
    getCourseById,
};

export default CoursesService;
