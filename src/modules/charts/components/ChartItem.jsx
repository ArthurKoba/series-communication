import React, {useEffect, useRef} from 'react';
import {Button, Container} from "react-bootstrap";

import chartManagerStorage from "../store/chartManagerStorage";

const ChartItem = ({chartStorage}) => {
    const ctx = useRef(null)

    useEffect(() => chartStorage.setCtx(ctx.current), [])
    return (
        <Container fluid className="d-flex row col-8">
            <canvas ref={ctx}></canvas>
            <Button onClick={() => chartStorage.click()}>click</Button>
            <Button onClick={() => chartManagerStorage.deleteChart(chartStorage)}>Удалить</Button>
        </Container>

    );
};

export default ChartItem;