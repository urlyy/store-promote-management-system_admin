import request from "../../utils/request";

const api = {
    getUserList: async (pageNum) => {
        const res = await request.get("/admin/users", { page_num: pageNum });
        return res.data.data;
    },
    deleteUser: async (userId) => {
        const res = await request.delete(`/admin/user/${userId}`);
        return res.data;
    },
    recoverDeleteUser: async (userId) => {
        const res = await request.putParam(`/admin/user/${userId}`);
        return res.data;
    }
}

export default api;