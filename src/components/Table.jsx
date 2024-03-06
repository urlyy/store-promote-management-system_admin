import { useRef, useEffect, useState } from "react";
import Pagination from "./Pagination";

const Table = ({ Header, RowTemplate, data, pageNum, totalPage, onPageChange = (newPageNum) => { } }) => {
    const tableRef = useRef(null);
    const [scrollPR, setPR] = useState(0);
    useEffect(() => {
        const table = tableRef.current;
        const updateHeaderPR = () => {
            const scrollbarWidth = table.offsetWidth - table.clientWidth;
            console.log(scrollbarWidth)
            setPR(scrollbarWidth);
        };
        // 在需要时调用
        updateHeaderPR();
        // 添加滚动事件监听
        window.addEventListener('resize', updateHeaderPR);
        // 在组件卸载时清理监听器
        return () => {
            window.addEventListener('resize', updateHeaderPR);
        };
    }, []);
    const handlePageClick = async (selected) => {
        console.log(selected);
        onPageChange(selected);
    }
    return (
        <div className="flex flex-col flex-1">
            <table className="w-full flex flex-col">
                <thead style={{ paddingRight: scrollPR }}>
                    <Header />
                </thead>
                <tbody className="h-[770px]" ref={tableRef}>
                    {data.map((datum, idx) => <RowTemplate key={idx} idx={idx} datum={datum} />)}
                </tbody>
            </table>
            {totalPage != null && <Pagination
                onChange={handlePageClick}
                current={pageNum}
                totalPage={totalPage}
            />}
        </div>
    )
}

export default Table;