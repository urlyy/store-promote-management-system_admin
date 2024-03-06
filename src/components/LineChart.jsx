// LineChart.js

import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ style, title = "折线图示例", data }) => {
    // 数据处理
    const processedData = data.map(item => ({ name: item.name, value: item.value }));

    // ECharts 配置项
    const option = {
        title: {
            text: title,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: processedData.map(item => item.name),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '数值',
                type: 'line',
                data: processedData.map(item => item.value),
            },
        ],
    };

    return (
        <ReactECharts option={option} style={{ height: '400px', width: '400px', ...style }} />
    );
};

export default LineChart;
