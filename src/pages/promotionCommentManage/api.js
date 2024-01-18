import request from "../../utils/request";

const api = {
    getComments2Promotion: async () => {
        const res = await request.get("/admin/comments/promotion", {});
        return res.data.data;
    },
}

export default api;