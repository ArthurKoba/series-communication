import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import SelectChartType from "./ui/SelectChartType";
import ModalRemoveChartButton from "./ui/ModalRemoveChartButton";
import SelectDataStreamType from "./ui/SelectDataStreamType";
import SelectDataStream from "./ui/SelectDataStream";
import SelectDataName from "./ui/SelectDataName";

const ChartItemConfiguration = observer(({chart}) => {
    const [maxScale, setMaxScale] = useState("")
    const [minScale, setMinScale] = useState("")
    const [minScaleInvalid, setMinScaleInvalid] = useState(false)
    const [maxScaleInvalid, setMaxScaleInvalid] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const changeMaxScale = (value) => {
        setMaxScale(value)
        value = parseFloat(value)
        if (isNaN(value)) return setMaxScaleInvalid(true)
        setMaxScaleInvalid(false)
        chart.setMaxScale(value)
    }

    const changeMinScale = (value) => {
        setMinScale(value)
        value = parseFloat(value)
        if (isNaN(value)) return setMinScaleInvalid(true)
        setMinScaleInvalid(false)
        chart.setMinScale(value)
    }

    return (
        <Container fluid className="row p-1">
            <Container fluid className="p-1 row col-6">
                <SelectChartType chart={chart}/>
                <Button size="sm" variant="danger" onClick={() => setShowRemoveModal(true)}>
                    Remove
                </Button>
                <Button onClick={() => chart.click()}>click</Button>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Min scale</InputGroup.Text>
                    <Form.Control onChange={(e) => changeMinScale(e.target.value)}
                                  value={minScale} isInvalid={minScaleInvalid}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Max scale</InputGroup.Text>
                    <Form.Control onChange={(e) => changeMaxScale(e.target.value)}
                                  value={maxScale} isInvalid={maxScaleInvalid}
                    />
                </InputGroup>
            </Container>
            <Container fluid className="p-1 row col-6">
                <SelectDataStreamType chart={chart}/>
                <SelectDataStream chart={chart}/>
                <SelectDataName chart={chart}/>
            </Container>

            <ModalRemoveChartButton
                show={showRemoveModal}
                handleClose={() => setShowRemoveModal(false)}
                handleConfirm={() => chart.manager.removeChart(chart.id)}
            />
        </Container>
    );
});

export default ChartItemConfiguration;