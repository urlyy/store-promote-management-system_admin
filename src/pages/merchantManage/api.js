import request from "../../utils/request";

const api = {
    getMerchantList: async (pageNum) => {
        const res = await request.get("/admin/merchants", { page_num: pageNum });
        return res.data.data;
    },
    deleteMerchant: async (userId) => {
        const res = await request.delete(`/admin/user/${userId}`);
        return res.data;
    },
    recoverDeleteMerchant: async (userId) => {
        const res = await request.putParam(`/admin/user/${userId}`);
        return res.data;
    }
}

export default api;