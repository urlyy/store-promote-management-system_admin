// BarChart.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
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
            .scaleBand()
            .domain(processedData.map(d => d.value))
            .range([0, 400])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, d => d.value)])
            .range([200, 0]);

        // 创建柱状图
        svg
            .selectAll('rect')
            .data(processedData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.value))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => 200 - yScale(d.value))
            .attr('fill', 'blue'); // 可以根据需要设置颜色

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

export default BarChart;
