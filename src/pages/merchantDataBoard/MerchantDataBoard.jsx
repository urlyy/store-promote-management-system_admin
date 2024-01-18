import { useState, useEffect } from "react"
import api from "./api"
import BarChart from "../../components/BarChart";
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'

const MerchantDataBoard = () => {
    const data = [10, 20, 30, 40];
    const data2 = [20, 15, 39, 48];
    const data3 = [
        { label: 'A', value: 30 },
        { label: 'B', value: 50 },
        { label: 'C', value: 20 },
    ];

    return (
        <div className="flex-1">
            <BarChart data={data} />
            <LineChart data={data2} />
            <PieChart data={data3} />
        </div>
    )
}

export default MerchantDataBoard