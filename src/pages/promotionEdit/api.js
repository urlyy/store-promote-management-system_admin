import request from "../../utils/request";

const api = {
    createPromotion: async (text, imgs) => {
        const res = await request.postBody("/promotion", { text: text, imgs: imgs });
        return res.data;
    },
    getPromotion: async (promotionId) => {
        const res = await request.get(`/promotion/${promotionId}`);
        return res.data.data;
    },
    editPromotion: async (promotionId, text, imgs) => {
        const res = await request.postBody(`/promotion/edit/${promotionId}`, { text: text, imgs: imgs });
        return res.data;
    },
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const resp = await request.postForm("/file", formData);
        return resp.data;
    }
}

export default api;