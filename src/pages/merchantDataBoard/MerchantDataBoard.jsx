import { useState, useEffect } from "react"
import api from "./api"
import BarChart from "../../components/BarChart";
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'

const MerchantDataBoard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.getData().then(res => {
            const data = res.data;
            console.log(data);
            setData(data);
        })
    }, [])


    const tableStyle = "flex-1 items-center flex p-2 border-b border-b-slate-400"
    return (
        <div className="flex-1 flex-col">
            {data &&
                <>
                    <div>
                        <BarChart className="flex-1" title={"发布推广数"} data={[{ name: "我的推广数", value: data.promotionNum }, { name: "平均推广数", value: data.averagePromotionNum }]}></BarChart>
                        <PieChart title={"用户打分"} className="flex-1" data={data.stars.map((star, idx) => ({ name: `${idx + 1}星`, value: star }))} ></PieChart>
                        <PieChart title={"用户评论情感"} className="flex-1" data={[{ name: "消极", "value": data.comment2merchantSentiments[0] }, { name: "积极", value: data.comment2merchantSentiments[1] }]} ></PieChart>
                    </div>
                    <div>
                        <div className="text-2xl h-[370px] border border-slate-400 rounded-md ml-16">
                            <div className="flex-col border-r border-slate-400">
                                <label className={tableStyle}>粉丝总数</label>
                                <label className={tableStyle}>用户评论店铺总数</label>
                                <label className={tableStyle}>用户评论推广总数</label>
                                <label className={tableStyle}>推广点赞总数</label>
                                <label className={tableStyle}>最多点赞推广ID</label>
                                <label className={tableStyle}>最多评论推广ID</label>
                            </div>
                            <div className="flex-col text-center">
                                <div className={tableStyle}>{data.fanNum}</div>
                                <div className={tableStyle}>{data.comment2merchantNum}</div>
                                <div className={tableStyle}>{data.comment2promotionNum}</div>
                                <div className={tableStyle}>{data.promotionLikeNum}</div>
                                <div className={tableStyle}>{data.maxLikePromotion.id}</div>
                                <div className={tableStyle}>{data.maxCommentPromotion.id}</div>
                            </div>
                        </div>
                    </div>
                </>

            }
        </div>
    )
}

export default MerchantDataBoard