import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Entrance from "../pages/Entrance/Entrance";
import AdminPromotionManage from "../pages/adminPromotionManage/AdminPromotionManage";
import UserManage from "../pages/userManage/UserManage";
import PromotionCommentManage from '../pages/promotionCommentManage/PromotionCommentManage'
import MerchantCommentManage from '../pages/merchantCommentManage/MerchantCommentManage';
import MerchantManage from '../pages/merchantManage/MerchantManage'
// import MerchantHome from '../pages/merchantHome/MerchantHome'
import MerchantDataBoard from '../pages/merchantDataBoard/MerchantDataBoard';
import PromotionManage from '../pages/promotionManage/PromotionManage'
import PromotionEdit from '../pages/promotionEdit/PromotionEdit';

import Dashboard from '../pages/dashboard/Dashboard'
import userStore from '../stores/user';


const NavigationItem = ({ text, to, navigate, isActive, onClick }) => {
    return (
        <div onClick={() => { onClick(); navigate(to) }} className={`${isActive && 'bg-primary200'} h-16 text-white items-center text-2xl pl-10 hover:bg-primary200`}>
            {text}
        </div>
    )
}

const Auth = ({ children }) => {
    const user = localStorage.getItem('user');
    if (user == null) {
        return (<><Entrance></Entrance></>)
    } else {
        return <>{children}</>
    }
}


const ROLE_ADMIN = 2;
const ROLE_MERCHANT = 1;

const Layout = ({ children }) => {
    const location = useLocation();
    const { id, role, username, avatar } = userStore();
    console.log(role)
    const logout = userStore(state => state.logout);
    const navigate = useNavigate();
    const [curUrl, setCurUrl] = useState("/");
    const handleChangeRoute = (url) => {
        setCurUrl(url);
    }
    let routes = [];
    if (role == ROLE_ADMIN) {
        routes = [
            // { path: "/", text: "首页", element: <Dashboard></Dashboard> },
            { path: "/userManage", text: "用户管理", element: <UserManage></UserManage> },
            { path: "/merchantManage", text: "商家管理", element: <MerchantManage></MerchantManage> },
            { path: "/adminPromotionManage", text: "推广管理", element: <AdminPromotionManage></AdminPromotionManage> },
            { path: "/merchantCommentManage", text: "商家评论管理", element: <MerchantCommentManage></MerchantCommentManage> },
            { path: "/promotionCommentManage", text: "推广评论管理", element: <PromotionCommentManage></PromotionCommentManage> },
        ];
    } else if (role == ROLE_MERCHANT) {
        routes = [
            { path: "/promotionManage", text: "推广管理", element: <PromotionManage></PromotionManage> },
            { path: "/promotionEdit", text: "编辑推广", element: <PromotionEdit></PromotionEdit> },
            { path: "/merchantDataBoard", text: "商家数据", element: <MerchantDataBoard></MerchantDataBoard> },
        ]
    }

    const urlText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path == curUrl) {
                return routes[i].text;
            }
        }
        return null;
    }

    useEffect(() => {
        // 获取当前页面的 URL
        // console.log('Current URL:', location.pathname);
        handleChangeRoute(location.pathname);
    }, [location]);


    const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
    }

    return (
        <div className={`flex-1 flex-row`}>
            <div className="w-1/6 bg-primary300 flex-col">
                <div className="h-16 justify-center w-full border-b-2 border-b-white gap-1">
                    <img src="./logo192.png" className="h-full aspect-square"></img>
                    <div className="text-white text-xl items-center">店铺推荐后台管理</div>
                </div>
                <div className="flex-col h-full">
                    {routes.map((item, idx) => <NavigationItem isActive={item.path == curUrl} onClick={handleChangeRoute.bind(null, idx)} key={idx} to={item.path} navigate={navigate} text={item.text}></NavigationItem>)}
                    {id != null && <div onClick={handleLogout} className='mt-auto h-16 text-white border-t-2 border-t-white items-center text-2xl hover:bg-primary200 justify-center'>
                        登出
                    </div>}
                </div>
            </div>
            <div className="flex-1  flex-col">
                <div className="border-b-2 border-b-black h-16 w-full items-center p-2">
                    <div>
                        <div className="text-xl">{urlText()}</div>
                    </div>
                    {id != null && <div className="ml-auto h-full items-center">
                        <img src={avatar} className="h-full aspect-square"></img>
                        <div className="text-lg">{username}</div>
                    </div>}
                </div>
                <div style={{ height: "calc(100% - 77px)" }} className='w-full p-2'>
                    <Auth>
                        {useRoutes(routes)}
                    </Auth>
                </div>
            </div>
        </div >
    )
}
export default Layout; 