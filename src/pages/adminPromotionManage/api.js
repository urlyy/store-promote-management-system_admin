import request from "../../utils/request";

const api = {
    getPromotions: async (pageNum) => {
        const res = await request.get("/admin/promotions", { page_num: pageNum });
        return res.data.data;
    },
    passPromotion: async (promotionId) => {
        const res = await request.postParam(`/admin/promotion/pass/${promotionId}`);
        return res.data;
    },
    denyPromotion: async (promotionId) => {
        const res = await request.postParam(`/admin/promotion/deny/${promotionId}`);
        return res.data;
    }
}

export default api;