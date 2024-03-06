import ReactECharts from 'echarts-for-react';

const BarChart = ({ data, style = {}, className = "", title = "柱状图示例" }) => {
    // 数据处理
    const processedData = data.map(item => ({ name: item.name, value: item.value }));

    // ECharts 配置项
    const option = {
        title: {
            text: title,
            left: 'center',
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
                type: 'bar',
                data: processedData.map(item => item.value),
            },
        ],
    };

    return (
        <ReactECharts className={className} option={option} style={{ height: '400px', width: '600px', ...style }} />
    );
};

export default BarChart;
