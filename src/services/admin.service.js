import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/admin/";
const getAllUsers = (adminId) => {
    return axios.get(API_URL + "users", {
        params: { adminId: adminId }
    });
};
const getAllMod = (adminId) => {
    return axios.get(API_URL + "moderators", {
        params: { adminId: adminId }
    });
};
const updateUserRole = (userId, adminId, newRole) => {
    console.log(newRole);
    return axios.put(`${API_URL}users/${userId}/role`, null, {
        params: { adminId: adminId, newRole: newRole },
        headers: {
            "Accept": "*/*",
        },
    });
};
const AdminService = {
    getAllUsers,
    updateUserRole,
    getAllMod
}
export default AdminService;