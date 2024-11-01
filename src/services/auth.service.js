import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth/";

const register = (username, email, password) => {
    const  role="USER";
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
        role
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "authenticate", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(response.date);
            }
z
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;