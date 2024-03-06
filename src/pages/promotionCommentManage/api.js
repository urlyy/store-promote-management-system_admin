import request from "../../utils/request";

const api = {
    getComments2Promotion: async (pageNum) => {
        const res = await request.get("/admin/comments/promotion", { page_num: pageNum });
        return res.data.data;
    },
    passComment: async (commentId) => {
        const res = await request.postParam(`/admin/comment2promotion/pass/${commentId}`);
        return res.data;
    },
    denyComment: async (commentId) => {
        const res = await request.postParam(`/admin/comment2promotion/deny/${commentId}`);
        return res.data;
    },
}

export default api;