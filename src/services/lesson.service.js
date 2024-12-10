import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/lessons";
const API_URL_BASE = "http://localhost:8000/api";

const createLesson = async (moduleId, lessonName, lessonDescription, level, file) => {
    const formData = new FormData();
    formData.append("lessonName", lessonName);
    formData.append("lessonDescription", lessonDescription);
    formData.append("level", level);
    if (file) {
        formData.append("git pull --rebase\nfile", file); // Добавляем файл
    }

    console.log("Данные для отправки на сервер:", formData.get("file")); // Лог файла

    try {
        const response = await axios.post(`${API_URL}/${moduleId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании урока:", error);
        throw error;
    }
};

const deleteLesson = async (lessonId) => {
    try {
        const response = await axios.delete(`${API_URL}/${lessonId}`);
        return response.data;
    } catch (error) {
        console.log("Error deleting lesson:", error);
        throw error;
    }
};

const getTopicsByLesson = async (lessonId) => {
    try {
        const response = await axios.get(`${API_URL_BASE}/topics/by-lesson/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching topics by lesson:", error);
        throw error;
    }
};


const LessonService = {
    createLesson,
    deleteLesson,
    getTopicsByLesson
};

export default LessonService;
