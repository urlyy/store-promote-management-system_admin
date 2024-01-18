import request from "../../utils/request";

const api = {
    getMerchantList: async () => {
        const res = await request.get("/admin/users", { role: 1 });
        return res.data.data;
    },
}

export default api;