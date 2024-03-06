import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";
import Table from "../../components/Table";
import Modal from '../../components/Modal'
import Swal from 'sweetalert2'


const PromotionCommentManage = () => {
    const [comments, setComments] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);

    const handleGetComments = async (pageNum) => {
        const res = await api.getComments2Promotion(pageNum);
        const comments = res.comments;
        setTotalPage(res.totalPage);
        setPageSize(res.pageSize);
        setComments(comments.map((item, idx) => ({
            id: item.id,
            userId: item.userId,
            promotionId: item.promotionId,
            text: item.text,
            createTime: item.createTime,
            isDeleted: item.isDeleted,
            status: item.status,
            merchantId: item.merchantId,
        })))
    }

    useEffect(() => {
        handleGetComments(pageNum);
    }, [])

    const Header = () => {
        return (
            <tr>
                <th>序号</th>
                <th>评论ID</th>
                <th>推广ID</th>
                <th>评价人ID</th>
                <th>商家ID</th>
                <th>评价内容</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        )
    }

    const handlePass = (idx) => {
        const p = comments[idx];
        Swal.fire({
            title: "你确定要允许该推广上线吗吗?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "审核通过",
            denyButtonText: `审核不通过`,
            cancelButtonText: "取消"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                api.passComment(p.id).then(res => {
                    if (res.success) {
                        setComments(prev => prev.map((item, index) => {
                            if (index == idx) {
                                item.status = 1;
                            }
                            return item;
                        }))
                    }
                })
            } else if (result.isDenied) {
                api.denyComment(p.id).then(res => {
                    if (res.success) {
                        setComments(prev => prev.map((item, index) => {
                            if (index == idx) {
                                item.status = 2;
                            }
                            return item;
                        }))
                    }
                })
            }
        });
    }

    const RowTemplate = ({ idx, datum }) => {
        const [showModal, setShowModal] = useState(false);
        return (
            <>
                {showModal && <Modal onClose={setShowModal.bind(null, false)}>
                    <div>{datum.text}</div>
                </Modal>}
                <tr key={idx} className="flex">
                    <Td>{pageSize * (pageNum - 1) + idx + 1}</Td>
                    <Td>{datum.id}</Td>
                    <Td>{datum.promotionId}</Td>
                    <Td>{datum.userId}</Td>
                    <Td>{datum.merchantId}</Td>
                    <Td><button className="hover:text-blue-500" onClick={setShowModal.bind(null, true)}>查看内容</button></Td>
                    <Td>{dateFormat(datum.createTime)}</Td>
                    <Td>
                        <div className="flex-1 gap-1 justify-center">
                            {datum.isDeleted == 1 && <div className="bg-slate-500 text-white p-1">已删除</div>}
                            {datum.status == 0 && <div className="bg-slate-500 text-white p-1">待审核</div>}
                            {datum.status == 1 && <div className="bg-green-500 text-white p-1">审核通过</div>}
                            {datum.status == 2 && <div className="bg-red-500 text-white p-1">审核不通过</div>}
                        </div>
                    </Td>
                    <Td>
                        <div className="flex-1 gap-1 justify-center">
                            <button onClick={handlePass.bind(null, idx)} className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">审核</button>
                            {/* <button className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">置顶</button>
                            <button className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">删除</button> */}
                        </div>
                    </Td>
                </tr >
            </>
        )
    }


    return (
        <div className="flex-1">
            <Table data={comments} pageNum={pageNum} totalPage={totalPage} Header={Header} RowTemplate={RowTemplate} onPageChange={handleGetComments} />
        </div>
    )
}
export default PromotionCommentManage;