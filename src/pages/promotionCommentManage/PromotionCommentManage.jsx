import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'

const MerchantCommentManage = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.getComments2Promotion().then(res => {
            const comments = res.comments;
            console.log(comments);
            setComments(comments.map((item, idx) => ({
                id: item.id,
                promotionId: item.promotion_id,
                userId: item.user_id,
                text: item.text,
                status: item.status,
                isDeleted: item.is_deleted,
            })))
        })
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>推广ID</th>
                    <th>评论者</th>
                    <th>内容</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((datum, idx) => (
                    <tr key={idx}>
                        <Td>{datum.id}</Td>
                        <Td>{datum.promotionId}</Td>
                        <Td>{datum.userId}</Td>
                        <Td>{datum.text}</Td>
                        <Td>
                            <div className="flex-1 gap-1 justify-center">
                                {datum.isDeleted == 1 && <div className="bg-slate-500 text-white p-1">已删除</div>}
                                {datum.status == 0 && <div className="bg-red-500 text-white p-1">待审核</div>}
                                {datum.status == 1 && <div className="bg-green-500 text-white p-1">审核通过</div>}
                                {datum.status == 2 && <div className="bg-slate-500 text-white p-1">审核不通过</div>}
                            </div>
                        </Td>
                        <Td>
                            <div className="flex-1 gap-1 justify-center">
                                <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">审核</button>
                                <button className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">删除</button>
                            </div>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default MerchantCommentManage;