import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";

import ModalRemoveChartButton from "./ui/ModalRemoveChartButton";


const ChartItem = observer(({chart}) => {
    const ctx = useRef(null)
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const fullScreen = chart.isFullScreen? "col-12": "col-6"

    useEffect(() => chart.setCtx(ctx.current), [])
    return (
        <Container className={"chart row p-1 " + fullScreen}>
            <Container className="border border-2 border-primary rounded">
                <canvas ref={ctx} className="border-bottom border-primary"></canvas>
                <Container className="d-flex justify-content-center p-2">
                        <Button onClick={() => chart.click()}>click</Button>
                        <Button variant="danger" onClick={() => setShowRemoveModal(true)}>
                            Remove
                        </Button>
                        <Button onClick={() => (chart.swapFullscreen())}>FullScreen</Button>
                </Container>
                <ModalRemoveChartButton
                    show={showRemoveModal}
                    handleClose={() => setShowRemoveModal(false)}
                    handleConfirm={chart.remove}
                />
            </Container>
        </Container>

    );
});

export default ChartItem;