import request from "../../utils/request";

const api = {
    getUserList: async () => {
        const res = await request.get("/admin/users", { role: 0 });
        return res.data.data;
    },
}

export default api;