import { useState, useEffect } from "react";
import Td from '../../components/Td'
import api from './api'
import dateFormat from "../../utils/dateFormat";
import Table from "../../components/Table";
import Modal from '../../components/Modal'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const PromotionManage = () => {
    const [promotions, setPromotions] = useState([]);
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);

    const handleGetPromotions = async (pageNum) => {
        const res = await api.getPromotions(pageNum);
        const promotions = res.promotions;
        setTotalPage(res.totalPage);
        setPageSize(res.pageSize);
        setPromotions(promotions.map((item, idx) => ({
            id: item.id,
            text: item.text,
            imgs: item.imgs,
            createTime: item.createTime,
            isTop: item.isTop,
            isDeleted: item.isDeleted,
            status: item.status,
            commentNum: item.commentNum,
            likeNum: item.likeNum,
        })))
    }

    useEffect(() => {
        handleGetPromotions(pageNum);
    }, [])

    const Header = () => {
        return (
            <tr>
                <th>序号</th>
                <th>推广ID</th>
                <th>推广内容</th>
                <th>创建时间</th>
                <th>评论数</th>
                <th>点赞数</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        )
    }

    const handleDelete = (idx) => {
        Swal.fire({
            title: "你确定要删除吗?",
            text: "删除后无法恢复",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定删除",
            cancelButtonText: "取消"
        }).then((result) => {

            if (result.isConfirmed) {
                const p = promotions[idx];
                api.deletePromotion(p.id).then(res => {
                    if (res.success) {
                        // setPromotions(prev => prev.map((item, index) => {
                        //     if (index == idx) {
                        //         item.isDeleted = true;
                        //     }
                        //     return item;
                        // }))
                        setPromotions(prev => prev.filter((item, index) => {
                            return idx !== index;
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
                    <div className="flex-col gap-2">
                        <div>{datum.text}</div>
                        <div>
                            {datum.imgs.map((url, idx) => (<img key={idx} className='h-28 aspect-square' src={url}></img>))}
                        </div>
                    </div>

                </Modal>}
                <tr key={idx} className="flex">
                    <Td>{pageSize * (pageNum - 1) + idx + 1}</Td>
                    <Td>{datum.id}</Td>
                    <Td><button className="hover:text-blue-500" onClick={setShowModal.bind(null, true)}>查看内容</button></Td>
                    <Td>{dateFormat(datum.createTime)}</Td>
                    <Td>{datum.commentNum}</Td>
                    <Td>{datum.likeNum}</Td>
                    <Td>
                        <div className="flex-1 gap-1 justify-center">
                            {/* {datum.isTop ? <div className="bg-yellow-500 text-white p-1">置顶</ div> : <div className="bg-blue-400 text-white p-1">普通</div>} */}
                            {datum.isDeleted == true && <div className="bg-slate-500 text-white p-1">已删除</div>}
                            {datum.status == 0 && <div className="bg-red-500 text-white p-1">待审核</div>}
                            {datum.status == 1 && <div className="bg-green-500 text-white p-1">审核通过</div>}
                            {datum.status == 2 && <div className="bg-slate-500 text-white p-1">审核不通过</div>}
                        </div>
                    </Td>
                    <Td>
                        <div className="flex-1 gap-1 justify-center">
                            <button onClick={() => { navigate(`/PromotionEdit?promotionId=${datum.id}`) }} className="p-1 border hover:text-white hover:bg-blue-400 rounded-md border-black text-lg">编辑推广</button>
                            {datum.isDeleted == false && <button onClick={handleDelete.bind(null, idx)} className="p-1 border hover:text-white hover:bg-red-400 rounded-md border-black text-lg">删除</button>}
                        </div>
                    </Td>
                </tr >
            </>
        )
    }


    return (
        <div className="flex-1">
            <Table data={promotions} pageNum={pageNum} totalPage={totalPage} Header={Header} RowTemplate={RowTemplate} onPageChange={handleGetPromotions} />
        </div>
    )
}
export default PromotionManage;