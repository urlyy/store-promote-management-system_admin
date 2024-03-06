// PieChart.js

import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ data, className = "", title = "饼图示例", style = {} }) => {
    // 数据处理
    const processedData = data.map(item => ({ name: item.name, value: item.value }));

    // ECharts 配置项
    const option = {
        title: {
            text: title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: processedData.map(item => item.name),
        },
        series: [
            {
                name: '用户打分情况',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: processedData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return (
        <ReactECharts className={className} option={option} style={{ height: '400px', width: '400px', ...style }} />
    );
};

export default PieChart;
