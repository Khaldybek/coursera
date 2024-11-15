import axios from "axios";

const API_URL = "http://localhost:8000/api/topics";

const createTopic = async (lessonId, name, description, title) => {
    try {
        const response = await axios.post(
            `${API_URL}/create`,
            null,
            {
                params: {
                    name,
                    description,
                    title,
                    lessonId
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error creating topic:", error);
        throw error;
    }
};



// Функция для удаления темы
const deleteTopic = async (topicId) => {
    try {
        const response = await axios.delete(`${API_URL}/${topicId}/delete`);
        return response.data;
    } catch (error) {
        console.log("Error deleting topic:", error);
        throw error;
    }
};
 const fetchTopic = async (topicId) => {
    const response = await fetch(`http://localhost:8000/api/topics/by-lesson/${topicId}`);
    console.log(response);
    return response.json();
};

 const takeTest = async (testId, selectedOption) => {
    const response = await fetch(`http://localhost:8000/api/tests/${testId}/take?selectedOption=${selectedOption}`, {
        method: "POST"
    });
    console.log(response);
    return response.json();
};


const TopicService = {
    createTopic,
    deleteTopic,
    fetchTopic,
    takeTest
};

export default TopicService;
