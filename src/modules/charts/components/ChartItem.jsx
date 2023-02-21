import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";

import ChartItemConfiguration from "./ChartItemConfiguration";


const ChartItem = observer(({chart}) => {
    const ctx = useRef(null)

    const fullScreen = chart.isFullScreen? "col-12": "col-6"

    useEffect(() => chart.setCtx(ctx.current), [])

    let fpsColor = chart.fps > 120? "info" : chart.fps > 90? "primary" : chart.fps > 60? "success" :
                   chart.fps > 60? "success" : chart.fps > 30? "warning" : "danger"

    return (
        <Container className={"chart row p-1 " + fullScreen}>
            <Container className="border border-2 border-primary rounded">
                <canvas ref={ctx} className="border-bottom border-primary"></canvas>
                <Container className="chart-button col d-flex justify-content-center">
                        <Button size="sm" onClick={() => chart.resetScales()}>Reset Scales</Button>
                        <Button size="sm" onClick={() => (chart.swapFullscreen())}>FullScreen</Button>
                        <Button size="sm" onClick={() => (chart.swapConfigurationOpened())}>Configuration</Button>
                        {chart.fps? <Button size="sm" variant={fpsColor} disabled>FPS: {chart.fps}</Button>: ""}
                </Container>
                {chart.isConfigurationOpened? <ChartItemConfiguration chart={chart}/> : ""}
            </Container>
        </Container>

    );
});

export default ChartItem;