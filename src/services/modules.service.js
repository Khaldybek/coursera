
import axios from "axios";
const API_URL = "http://localhost:8000/api/modules";

const createModule = async (courseId, moduleName) => {
    try {
        const response = await axios.post(
            `${API_URL}/${courseId}/create`,
            null,  // Пустое тело запроса
            { params: { moduleName } }  // Передаем moduleName как query-параметр
        );
        return response.data;
    } catch (error) {
        console.error(`Ошибка при создании модуля для курса с ID ${courseId}:`, error);
        throw error;
    }
};

const getModuleById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении модуля с ID ${id}:`, error);
        throw error;
    }
};


const ModulService = {
    createModule,
    getModuleById
};
export default ModulService;