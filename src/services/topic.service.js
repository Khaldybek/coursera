import axios from "axios";
import {getPresignedDownloadUrl} from "./minio.service.js";

const API_URL = "http://localhost:8000/api/topics";

const createTopic = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8000/api/topics/create", formData, {
            headers: {"Content-Type": "multipart/form-data"}
        });
        return response.data;
    } catch (error) {
        console.log("Error creating topic:", error);
        throw error;
    }
};


export const fetchPresignedUrls = async (topics) => {
    try {
        return await Promise.all(
            topics.map(async (topic) => {
                if (!topic.files || topic.files.length === 0) return topic;

                const filesWithUrls = await Promise.all(
                    topic.files.map(async (file) => {
                        const filePath = file.fileUrl.replace(`http://localhost:9000/cousera/`, "");
                        const downloadUrl = await getPresignedDownloadUrl(filePath);
                        return { ...file, downloadUrl };
                    })
                );

                return { ...topic, files: filesWithUrls };
            })
        );
    } catch (error) {
        console.error("Ошибка получения presigned URLs:", error);
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
    fetchPresignedUrls,
    deleteTopic,
    fetchTopic,
    takeTest
};

export default TopicService;
