import React, {useState} from "react";
import {Button, Container, Form, InputGroup, Modal} from "react-bootstrap";

import SelectChartType from "./SelectChartType";
import ModalRemoveChartButton from "./ModalRemoveChartButton";
import SelectDataStreamType from "./SelectDataStreamType";
import SelectDataStream from "./SelectDataStream";
import SelectDataName from "./SelectDataName";

export const ModalChartConfiguration = ({chart, show, handleClose}) => {

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
        <Modal centered={true} show={show} onHide={handleClose} size="lg">
            <Modal.Header className="justify-content-center">
                <b>Configuration chart</b>
            </Modal.Header>
            <Modal.Body className="row justify-content-center">
                <Container className="p-1 col-12 col-md-6">
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Chart type</InputGroup.Text>
                        <SelectChartType chart={chart}/>
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Max scale</InputGroup.Text>
                        <Form.Control
                            type="number"
                            onChange={(e) => changeMaxScale(e.target.value)}
                            placeholder="auto"
                            value={maxScale}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Min scale</InputGroup.Text>
                        <Form.Control
                            type="number"
                            onFocus={() => setMinScale(chart.yAxisMin)}
                            onChange={(e) => changeMinScale(e.target.value)}
                            placeholder="auto"
                            value={minScale}
                        />
                    </InputGroup>
                </Container >
                <Container className="p-1 col-12 col-md-6">
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Stream Type</InputGroup.Text>
                        <SelectDataStreamType chart={chart}/>
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Stream ID</InputGroup.Text>
                        <SelectDataStream chart={chart}/>
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>DataName</InputGroup.Text>
                        <SelectDataName chart={chart}/>
                    </InputGroup>

                </Container>

                <ModalRemoveChartButton
                    show={showRemoveModal}
                    handleClose={() => setShowRemoveModal(false)}
                    handleConfirm={() => chart.manager.removeChart(chart.id)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" className="col"
                        onClick={() => handleClose()}>Close</Button>
                <Button size="sm" variant="danger" onClick={() => setShowRemoveModal(true)}>Remove</Button>
            </Modal.Footer>
        </Modal>
    );
};