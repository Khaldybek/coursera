import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/lessons";
const API_URL_BASE = "http://localhost:8000/api";

const createLesson = async (moduleId, lessonName, lessonDescription, level) => {
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
