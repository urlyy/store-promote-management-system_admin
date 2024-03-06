import request from '../../utils/request'

const api = {
    login: async (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password)
        const resp = await request.postForm("/admin/login", formData);
        return resp.data;
    },
    register: async () => {

    },
}
export default api;