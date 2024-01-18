import request from "../../utils/request";

const api = {
    getPromotions: async () => {
        const res = await request.get("/admin/promotions");
        return res.data.data;
    },
}

export default api;