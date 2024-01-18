import request from "../../utils/request";

const api = {
    getComments2Merchant: async () => {
        const res = await request.get("/admin/comments/merchant", {})
        return res.data.data;
    },
}

export default api;