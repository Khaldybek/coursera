import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/courses/";
const create = (name, description, companyName) => {
    return axios.post(API_URL, {
        name,
        description,
        companyName
    });
};
const getAllCreate = () => {
    return axios.get(API_URL, );
};
