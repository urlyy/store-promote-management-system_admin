import { create } from 'zustand'

let user = null;

const userStr = localStorage.getItem("user");
if (userStr) {
    user = JSON.parse(userStr);
}

const userStore = create(set => ({
    token: user ? user.token : null,
    id: user ? user.id : null,
    username: user ? user.username : null,
    // logout: () => set(state => ({
    //     token: null
    // })),
    setUser: (user) => set(state => ({
        id: user.id,
        username: user.username,
        token: user.token,
    }))
}))



export default userStore;