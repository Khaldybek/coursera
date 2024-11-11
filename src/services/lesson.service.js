import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/lessons";

// Функция для создания урока
const createLesson = async (moduleId, lessonName, lessonDescription, level) => {
    console.log(lessonDescription, moduleId, lessonName, lessonDescription);
    try {
        const response = await axios.post(
            `${API_URL}/${moduleId}`,
            null,
            {
                params: {
                    lessonName,
                    lessonDescription,
                    level,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error creating lesson:", error);
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

const LessonService = {
    createLesson,
    deleteLesson,
};

export default LessonService;
