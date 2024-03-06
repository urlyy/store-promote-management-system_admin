import request from "../../utils/request";


const api = {
    getData: async () => {
        const res = await request.get("/admin/merchant/data");
        return res.data.data;
    }
}

export default api;