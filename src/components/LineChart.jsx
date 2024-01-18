// LineChart.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        // 清空之前的内容
        d3.select(svgRef.current).selectAll('*').remove();

        // 创建 SVG 容器
        const svg = d3.select(svgRef.current);

        // 数据处理
        const processedData = data.map(d => ({ value: d }));

        // 创建 x 和 y 的比例尺
        const xScale = d3
            .scaleLinear()
            .domain([0, processedData.length - 1])
            .range([0, 400]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, d => d.value)])
            .range([200, 0]);

        // 创建折线生成器
        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d.value));

        // 创建折线路径
        svg
            .append('path')
            .datum(processedData)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', 'blue'); // 可以根据需要设置颜色

        // 创建 x 轴
        const xAxis = d3.axisBottom(xScale);
        svg
            .append('g')
            .attr('transform', 'translate(0, 200)')
            .call(xAxis);

        // 创建 y 轴
        const yAxis = d3.axisLeft(yScale);
        svg
            .append('g')
            .call(yAxis);
    }, [data]);

    return (
        <svg ref={svgRef} width={400} height={200}>
            {/* SVG 元素 */}
        </svg>
    );
};

export default LineChart;
