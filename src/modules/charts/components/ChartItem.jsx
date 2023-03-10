import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";

import {isSmallScreen} from "../../../shared/utils";
import {ModalChartConfiguration} from "./ui/ModalChartConfiguration";


const ChartItem = observer(({chart}) => {

    const containerRef = useRef(null)

    useEffect(() => {
        chart.setContainer(containerRef.current)
        new ResizeObserver(() => chart.chart.reflow()).observe(containerRef.current)
    }, [])

    const fullScreen = chart.isFullScreen? "col-12": "col-md-6"
    let fpsColor = chart.fps > 120? "info" : chart.fps > 90? "primary" : chart.fps > 60? "success" :
                   chart.fps > 60? "success" : chart.fps > 30? "warning" : "danger"

    return (
        <Container className={"chart row p-1 " + fullScreen}>
            <Container className="border border-2 border-primary rounded">
                <Container ref={containerRef} fluid className="border-bottom border-primary m-0"/>
                <Container className="chart-button col d-flex justify-content-center">
                    <Button size="sm" onClick={() => chart.resetScales()}>Reset Scales</Button>
                    {isSmallScreen()? "" : <Button size="sm" onClick={() => (chart.swapFullscreen())}>FullScreen</Button>}
                    <Button size="sm" onClick={() => (chart.swapConfigurationOpened())}>Configuration</Button>
                    {chart.fps? <Button size="sm" variant={fpsColor} disabled>FPS: {chart.fps}</Button>: ""}
                </Container>
                <ModalChartConfiguration
                    chart={chart}
                    show={chart.isConfigurationOpened}
                    handleClose={() => chart.swapConfigurationOpened()}
                />
            </Container>
        </Container>

    );
});

export default ChartItem;