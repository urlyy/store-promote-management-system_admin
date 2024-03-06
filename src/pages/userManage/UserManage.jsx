import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";
import Table from "../../components/Table";
import Swal from 'sweetalert2'

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);

    const handleGetUsers = async (pageNum) => {
        setPageNum(pageNum);
        const res = await api.getUserList(pageNum);
        const users = res.users;
        setTotalPage(res.totalPage);
        setPageSize(res.pageSize);
        setUsers(users.map((user, idx) => ({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            brief: user.brief,
            role: user.role,
            isDeleted: user.isDeleted,
            createTime: user.createTime,
            lastLogin: user.lastLogin,
            fanNum: user.fanNum,
        })))
    }
    useEffect(() => {
        handleGetUsers(pageNum);
    }, [])

    const handleDelete = (idx) => {
        const u = users[idx];
        Swal.fire({
            title: `你确定要封禁用户${u.username}吗?`,
            text: "封禁后还可恢复",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定封禁",
            cancelButtonText: "取消"
        }).then((result) => {
            if (result.isConfirmed) {
                api.deleteUser(u.id).then(res => {
                    if (res.success) {
                        setUsers(prev => prev.map((item, index) => {
                            if (index == idx) {
                                item.isDeleted = true;
                            }
                            return item;
                        }))
                    }
                })
            }
        });
    }

    const handleRecoverDelete = (idx) => {
        const u = users[idx];
        Swal.fire({
            title: `你确定要恢复用户${u.username}吗?`,
            text: "恢复后还可封禁",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定恢复",
            cancelButtonText: "取消"
        }).then((result) => {
            if (result.isConfirmed) {
                api.recoverDeleteUser(u.id).then(res => {
                    if (res.success) {
                        setUsers(prev => prev.map((item, index) => {
                            if (index == idx) {
                                item.isDeleted = false;
                            }
                            return item;
                        }))
                    }
                })
            }
        });
    }


    const Header = () => {
        return (
            <tr>
                <th>序号</th>
                <th>用户ID</th>
                <th>用户名</th>
                <th>头像</th>
                <th>简介</th>
                <th>粉丝数</th>
                <th>角色</th>
                <th>上一次登录</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        )
    }

    const RowTemplate = ({ idx, datum }) => {
        return (
            <tr key={idx}>
                <Td>{pageSize * (pageNum - 1) + idx + 1}</Td>
                <Td>{datum.id}</Td>
                <Td>{datum.username}</Td>
                <Td><img className='h-12 aspect-square object-cover' src={datum.avatar}></img></Td>
                <Td>{datum.brief}</Td>
                <Td>{datum.fanNum}</Td>
                <Td>
                    {datum.role == 0 && <div className="bg-blue-400 text-white p-1">普通</div>}
                    {datum.role == 1 && <div className="bg-green-500 text-white p-1">商家</ div>}
                    {datum.role == 2 && <div className="bg-yellow-500 text-white p-1">管理员</ div>}
                </Td>
                <Td>{dateFormat(datum.lastLogin)}</Td>
                <Td>
                    <div className="w-full gap-1 justify-center">
                        {datum.isDeleted == true && <div className="bg-red-500 text-white p-1">封禁中</div>}
                        {datum.isDeleted == false && <div className="bg-green-500 text-white p-1">正常</div>}
                    </div>
                </Td>
                <Td>
                    <div className="w-full gap-1 justify-center">
                        {datum.role != 2 && datum.isDeleted == false && <button onClick={handleDelete.bind(null, idx)} className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">封禁</button>}
                        {datum.role != 2 && datum.isDeleted == true && <button onClick={handleRecoverDelete.bind(null, idx)} className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">恢复</button>
                        }
                    </div>
                </Td>
            </tr>
        )
    }


    return (
        <div className="flex-1">
            <Table data={users} Header={Header} RowTemplate={RowTemplate} pageNum={pageNum} onPageChange={handleGetUsers} totalPage={totalPage} />
        </div>
    )
}
export default UserManage;
