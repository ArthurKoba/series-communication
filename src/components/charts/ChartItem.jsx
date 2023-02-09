import React, {useEffect, useRef} from 'react';

const ChartItem = ({chartStorage}) => {
    const ctx = useRef(null)

    useEffect(() => chartStorage.setCtx(ctx.current), [])
    return (
        <canvas ref={ctx}></canvas>
    );
};

export default ChartItem;