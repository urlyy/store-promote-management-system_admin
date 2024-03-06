import request from "../../utils/request";

const api = {
    getComments2Merchant: async (pageNum) => {
        const res = await request.get("/admin/comments/merchant", { page_num: pageNum })
        return res.data.data;
    },
    passComment: async (commentId) => {
        const res = await request.postParam(`/admin/comment2merchant/pass/${commentId}`);
        return res.data;
    },
    denyComment: async (commentId) => {
        const res = await request.postParam(`/admin/comment2merchant/deny/${commentId}`);
        return res.data;
    },
}

export default api;