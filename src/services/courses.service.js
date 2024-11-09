import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/courses";

// Создание нового курса
const create = async (name, description, companyName) => {
    try {
        const response = await axios.post(API_URL, {
            name,
            description,
            companyName
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании курса:", error);
        throw error;  // Пробрасываем ошибку для обработки на уровне компонентов
    }
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

const CoursesService = {
    create,
    getAll,
};

export default CoursesService;
