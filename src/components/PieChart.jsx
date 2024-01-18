import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width = 400, height = 400 }) => {
    const chartRef = useRef();

    useEffect(() => {
        // 创建饼图布局
        const pie = d3
            .pie()
            .value((d) => d.value)
            .sort(null);

        // 创建弧形生成器
        const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2 - 10);

        // 创建SVG容器
        const svg = d3.select(chartRef.current).append('svg').attr('width', width).attr('height', height);

        // 创建饼图组
        const pieGroup = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

        // 绘制扇形
        const arcs = pieGroup.selectAll('path').data(pie(data)).enter().append('path');

        arcs
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i % 10]) // 使用D3的颜色方案
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);
    }, []);

    return <div ref={chartRef} />;
};

export default PieChart;