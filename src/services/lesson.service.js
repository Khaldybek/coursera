import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/lessons";
const createLesson = async (moduleId, lessonName, lessonDescription) => {
    console.log(lessonDescription, moduleId, lessonName, lessonDescription);
    try {
        const response = await axios.post(
            `${API_URL}/${moduleId}`,
            null,
            {
                params: {
                    lessonName,
                    lessonDescription,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error creating lesson:", error);
        throw error;
    }
};
const LessonService = {
    createLesson
};
export default LessonService;