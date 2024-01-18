import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Entrance from "../pages/Entrance/Entrance";
import PromotionManage from "../pages/promotionManage/PromotionManage";
import UserManage from "../pages/userManage/UserManage";
import PromotionCommentManage from '../pages/promotionCommentManage/PromotionCommentManage'
import MerchantCommentManage from '../pages/merchantCommentManage/MerchantCommentManage';
import MerchantManage from '../pages/merchantManage/MerchantManage'
import MerchantHome from '../pages/merchantHome/MerchantHome'
import MerchantDataBoard from '../pages/merchantDataBoard/MerchantDataBoard';

import Dashboard from '../pages/dashboard/Dashboard'


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

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [curUrl, setCurUrl] = useState("/");
    const handleChangeRoute = (url) => {
        setCurUrl(url);
    }
    const routes = [
        { path: "/", text: "首页", element: <Dashboard></Dashboard> },
        { path: "/userManage", text: "用户管理", element: <UserManage></UserManage> },
        { path: "/merchantManage", text: "商家管理", element: <MerchantManage></MerchantManage> },
        { path: "/promotionManage", text: "推广管理", element: <PromotionManage></PromotionManage> },
        { path: "/merchantCommentManage", text: "商家评论管理", element: <MerchantCommentManage></MerchantCommentManage> },
        { path: "/promotionCommentManage", text: "推广评论管理", element: <PromotionCommentManage></PromotionCommentManage> },
        { path: "/MerchantHome", text: "商家操作台", element: <MerchantHome></MerchantHome> },
        { path: "/MerchantDataBoard", text: "商家数据", element: <MerchantDataBoard></MerchantDataBoard> },

        // { path: "/dataBoard", text: "数据可视化", element: <DataBoard></DataBoard> }
    ];
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


    const logout = () => {
        console.log("登出");
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
                    <div onClick={logout} className='mt-auto h-16 text-white border-t-2 border-t-white items-center text-2xl hover:bg-primary200 justify-center'>
                        登出
                    </div>
                </div>
            </div>
            <div className="flex-1  flex-col">
                <div className="border-b-2 border-b-black h-16 w-full items-center p-2">
                    <div>
                        <div className="text-xl">{urlText()}</div>
                    </div>
                    <div className="ml-auto h-full items-center">
                        <img src="./logo192.png" className="h-full aspect-square"></img>
                        <div className="text-lg">覃莆任</div>
                    </div>
                </div>
                <div className='w-full p-2 max-h-screen'>
                    <Auth>
                        {useRoutes(routes)}
                    </Auth>
                </div>
            </div>
        </div >
    )
}
export default Layout; 