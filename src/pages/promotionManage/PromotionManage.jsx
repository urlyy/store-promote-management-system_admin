import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";


const PromotionManage = () => {
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        api.getPromotions().then(res => {
            const promotions = res.promotions;
            setPromotions(promotions.map((item, idx) => ({
                id: item.id,
                userId: item.user_id,
                text: item.text,
                imgs: item.imgs,
                createTime: item.create_time,
                isTop: item.is_top,
                isDeleted: item.is_deleted,
                status: item.status,
            })))
        })
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>商家</th>
                    <th>文案</th>
                    <th>图片</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {promotions.map((datum, idx) => (
                    <tr key={idx}>
                        <Td>{datum.id}</Td>
                        <Td>{datum.userId}</Td>
                        <Td>{datum.text}</Td>
                        <Td>
                            {datum.imgs.map((url, idx) => (<img key={idx} className='h-20 aspect-square' src={url}></img>))}
                        </Td>
                        <Td>{dateFormat(datum.createTime)}</Td>
                        <Td>
                            <div className="flex-1 gap-1 justify-center">
                                {datum.isTop ? <div className="bg-yellow-500 text-white p-1">置顶</ div> : <div className="bg-blue-400 text-white p-1">普通</div>}
                                {datum.isDeleted == 1 && <div className="bg-slate-500 text-white p-1">已删除</div>}
                                {datum.status == 0 && <div className="bg-red-500 text-white p-1">待审核</div>}
                                {datum.status == 1 && <div className="bg-green-500 text-white p-1">审核通过</div>}
                                {datum.status == 2 && <div className="bg-slate-500 text-white p-1">审核不通过</div>}
                            </div>
                        </Td>
                        <Td>
                            <div className="flex-1 gap-1 justify-center">
                                <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">审核</button>
                                <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">置顶</button>
                                <button className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">删除</button>
                            </div>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default PromotionManage;