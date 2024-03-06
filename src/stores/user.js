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
    role: user ? user.role : null,
    avatar: user ? user.avatar : null,
    logout: () => set(state => ({
        token: null,
        id: null,
        username: null,
        role: null,
        avatar: null,
    })),
    setUser: (user) => set(state => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        token: user.token,
    }))
}))



export default userStore;