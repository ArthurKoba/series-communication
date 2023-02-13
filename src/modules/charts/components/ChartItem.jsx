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
        <Container fluid className={"d-flex row border border-2 border-primary rounded p-0 " + fullScreen}>
            <canvas ref={ctx} className="border-bottom border-primary"></canvas>
            <Container fluid className="p-2">

                    <Button onClick={() => chart.click()}>click</Button>
                    <Button onClick={() => (chart.isFullScreen = !chart.isFullScreen)}>FullScreen</Button>
                    <Button variant="danger" onClick={() => setShowRemoveModal(true)}>
                        Удалить
                    </Button>

            </Container>
            <ModalRemoveChartButton
                show={showRemoveModal}
                handleClose={() => setShowRemoveModal(false)}
                handleConfirm={chart.remove}
            />
        </Container>

    );
});

export default ChartItem;