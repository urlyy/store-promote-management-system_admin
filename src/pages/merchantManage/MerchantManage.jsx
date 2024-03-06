import { useState, useEffect, useRef } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";
import Table from "../../components/Table";
import location2addr from '../../utils/location2addr'
import Swal from 'sweetalert2'

const MerchantManage = () => {
    const [merchants, setMerchants] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);

    const handleGetMerchants = async (pageNum) => {
        setPageNum(pageNum);
        const res = await api.getMerchantList(pageNum)
        const merchants = res.merchants;
        setTotalPage(res.totalPage);
        setPageSize(res.pageSize);
        setMerchants(merchants.map((user, idx) => ({
            userId: user.userId,
            username: user.username,
            avatar: user.avatar,
            brief: user.brief,
            isDeleted: user.isDeleted,
            createTime: user.createTime,
            lastLogin: user.lastLogin,
            fanNum: user.fanNum,
            promotionNum: user.promotionNum,
            commentNum: user.commentNum,
            location: user.location,
            category: user.category,

        })))

    }
    useEffect(() => {
        handleGetMerchants(pageNum);
    }, [])



    const Header = () => {
        return (
            <tr>
                <th>序号</th>
                <th>ID</th>
                <th>商家名</th>
                <th>头像</th>
                <th>简介</th>
                <th>商家类别</th>
                <th>位置</th>
                <th>粉丝数</th>
                <th>发布推广数</th>
                <th>上一次登录</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        )
    }

    const handleDelete = (idx) => {
        const u = merchants[idx];
        Swal.fire({
            title: `你确定要封禁商家${u.username}吗?`,
            text: "封禁后还可恢复",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定封禁",
            cancelButtonText: "取消"
        }).then((result) => {
            if (result.isConfirmed) {
                api.deleteMerchant(u.userId).then(res => {
                    if (res.success) {
                        setMerchants(prev => prev.map((item, index) => {
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
        const u = merchants[idx];
        Swal.fire({
            title: `你确定要恢复商家${u.username}吗?`,
            text: "恢复后还可封禁",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定恢复",
            cancelButtonText: "取消"
        }).then((result) => {
            if (result.isConfirmed) {
                api.recoverDeleteMerchant(u.userId).then(res => {
                    if (res.success) {
                        setMerchants(prev => prev.map((item, index) => {
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

    const RowTemplate = ({ datum, idx }) => {
        const [location, setLocation] = useState(null);
        useEffect(() => {
            if (datum.location) {
                location2addr(datum.location[0], datum.location[1]).then(res => {
                    setLocation(res);
                })
            }
        }, [datum.location])
        const location2text = () => {
            if (datum.location) {
                return `[${datum.location[0]},${datum.location[1]}]`
            }
        }
        return (
            <tr key={idx}>
                <Td>{pageSize * (pageNum - 1) + idx + 1}</Td>
                <Td>{datum.userId}</Td>
                <Td>{datum.username}</Td>
                <Td><img className='h-12 aspect-square object-cover' src={datum.avatar}></img></Td>
                <Td>{datum.brief}</Td>
                <Td>{datum.category}</Td>
                <Td>{location ? location : location2text()}</Td>
                <Td>{datum.fanNum}</Td>
                <Td>{datum.promotionNum}</Td>
                <Td>{dateFormat(datum.lastLogin)}</Td>
                <Td>
                    <div className="w-full gap-1 justify-center">
                        {datum.isDeleted == true && <div className="bg-red-500 text-white p-1">封禁</div>}
                        {datum.isDeleted == false && <div className="bg-green-500 text-white p-1">正常</div>}
                    </div>
                </Td>
                <Td>
                    <div className="w-full gap-1 justify-center">
                        {/* <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">修改</button> */}

                        {datum.isDeleted == false && <button onClick={handleDelete.bind(null, idx)} className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">封禁</button>}
                        {datum.isDeleted == true && <button onClick={handleRecoverDelete.bind(null, idx)} className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">恢复</button>
                        }
                    </div>
                </Td>
            </tr>
        )
    }


    return (
        <div className="flex-1">
            <Table Header={Header} RowTemplate={RowTemplate} data={merchants} pageNum={pageNum} totalPage={totalPage} onPageChange={handleGetMerchants} />
        </div>
    )
}
export default MerchantManage;