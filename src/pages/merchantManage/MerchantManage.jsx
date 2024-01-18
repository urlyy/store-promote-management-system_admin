import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";

const MerchantManage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.getMerchantList().then(res => {
            const users = res.users;
            setUsers(users.map((user, idx) => ({
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                brief: user.brief,
                coin: user.coin,
                role: user.role,
                isDeleted: user.is_deleted,
                createTime: user.create_time,
                lastLogin: user.last_login,
            })))
        })
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>头像</th>
                    <th>简介</th>
                    <th>金币</th>
                    <th>上一次登录</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {users.map((datum, idx) => (
                    <tr key={idx}>
                        <Td>{datum.id}</Td>
                        <Td>{datum.username}</Td>
                        <Td><img className='h-12 aspect-square object-cover' src={datum.avatar}></img></Td>
                        <Td>{datum.brief}</Td>
                        <Td>{datum.coin}</Td>
                        <Td>{dateFormat(datum.lastLogin)}</Td>
                        <Td>
                            <div className="w-full gap-1 justify-center">
                                {/* {datum.role == 0 && <div className="bg-blue-400 text-white p-1">普通</div>}
                                {datum.role == 1 && <div className="bg-green-500 text-white p-1">商家</ div>}
                                {datum.role == 2 && <div className="bg-yellow-500 text-white p-1">管理员</ div>} */}
                                {datum.isDeleted == true && <div className="bg-red-500 text-white p-1">封禁</div>}
                                {datum.isDeleted == false && <div className="bg-green-500 text-white p-1">正常</div>}
                            </div>
                        </Td>
                        <Td>
                            <div className="w-full gap-1 justify-center">
                                <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">修改</button>
                                <button className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">封禁</button>
                            </div>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default MerchantManage;