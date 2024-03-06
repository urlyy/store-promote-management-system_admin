const Pagination = ({ current, totalPage, onChange = (selected) => { } }) => {
    const range = (left, right) => {
        const l = Math.max(left, 1);
        const r = Math.min(right, totalPage);
        const res = [];
        for (let i = l; i <= r; i++) {
            res.push(i);
        }
        return res;
    }

    const range1 = range(current - 5, current - 1);

    const range2 = range(current + 1, current + 5);

    let ranges = Array.from(new Set([...range1, current, ...range2]));

    if (ranges.length < 11) {
        const sub = 11 - ranges.length;
        if (ranges[0] != 1) {
            //左扩
            const extend = range(ranges[0] - sub, ranges[0] - 1);
            ranges = [...extend, ...ranges];
        } else {
            //右扩
            const extend = range(ranges[ranges.length - 1] + 1, ranges[ranges.length - 1] + sub);
            ranges = [...ranges, ...extend];
        }
    }
    let buttons = [
        <button onClick={() => { onChange(1) }} key="page-first" className="p-1 text-center">首页</button>,
    ];
    if (current >= 2) {
        buttons.push(<button onClick={() => { onChange(current - 1) }} key="page-prev" className="p-1 text-center hover:border-b hover:border-blue-400">{'<'}</button>);
        // buttons.push();
    }

    ranges.forEach((num, idx) => {
        if (idx == 0 && ranges[0] != 1) {
            buttons.push(<button type="button" key={`page-sl-0`} disabled className='p-1 text-center bg-white aspect-square'>...</button>);
        }
        buttons.push(<button type="button" key={`page-${idx}`} className={`${num === current ? 'text-red-400 border-b border-red-400 pointer-events-none' : ''} p-1 text-center bg-white hover:border-b hover:border-blue-400`} onClick={() => { onChange(num) }}>{num}</button>);
        if (idx == ranges.length - 1 && ranges[ranges.length - 1] != totalPage) {
            buttons.push(<button type="button" key={`page-sl-1`} disabled className='p-1 text-center bg-white aspect-square'>...</button>);
        }
    })
    if (current <= totalPage - 1) {
        buttons.push(<button onClick={() => { onChange(current + 1) }} key="page-next" className="p-1 text-center hover:border-b hover:border-blue-400">{'>'}</button>);
    }
    buttons = [...buttons, <button onClick={() => { onChange(totalPage) }} key="page-last" className=" p-1 text-center">末页</button>]
    return (
        <div className='flex justify-center'>
            {buttons}
        </div>
    )
}

export default Pagination;