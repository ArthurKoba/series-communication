import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import SelectChartType from "./SelectChartType";
import ModalRemoveChartButton from "./ModalRemoveChartButton";
import SelectDataStreamType from "./SelectDataStreamType";
import SelectDataStream from "./SelectDataStream";
import SelectDataName from "./SelectDataName";

const ChartItemConfiguration = observer(({chart}) => {
    const [maxScale, setMaxScale] = useState(chart.yAxisMax? chart.yAxisMax.toString() : "")
    const [minScale, setMinScale] = useState(chart.yAxisMin? chart.yAxisMin.toString() : "")

    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const changeMaxScale = (value) => {
        setMaxScale(value)
        chart.setAxisScalesY({max: value? parseFloat(value): undefined, min: chart.yAxisMin})
    }

    const changeMinScale = (value) => {
        setMinScale(value)
        chart.setAxisScalesY({max: chart.yAxisMax, min: value? parseFloat(value): undefined})
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
                    <InputGroup.Text>Max scale</InputGroup.Text>
                    <Form.Control type="number"
                        onChange={(e) => changeMaxScale(e.target.value)}
                        placeholder="auto"
                        value={maxScale}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Min scale</InputGroup.Text>
                    <Form.Control type="number"
                        onFocus={() => setMinScale(chart.yAxisMin)}
                        onChange={(e) => changeMinScale(e.target.value)}
                        placeholder="auto"
                        value={minScale}
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