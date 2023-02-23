import React, {useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, Modal} from "react-bootstrap";

import SelectChartType from "./SelectChartType";
import ModalRemoveChartButton from "./ModalRemoveChartButton";
import SelectDataStreamType from "./SelectDataStreamType";
import SelectDataStream from "./SelectDataStream";
import SelectDataName from "./SelectDataName";
import {changeNumberWithValidation} from "../../../../shared/utils";


const getChartMaxAxisY = (chart) => chart.chartConfig.yAxis.max? chart.chartConfig.yAxis.max.toString() : ""
const getChartMinAxisY = (chart) => chart.chartConfig.yAxis.min? chart.chartConfig.yAxis.min.toString() : ""

export const ModalChartConfiguration = ({chart, show, handleClose}) => {
    const [name, setName] = useState(chart.chartConfig.title.text || "")
    const [maxScale, setMaxScale] = useState(getChartMaxAxisY(chart))
    const [minScale, setMinScale] = useState(getChartMinAxisY(chart))
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    useEffect(() => setMaxScale(getChartMaxAxisY(chart)), [chart.chartConfig.yAxis.max])
    useEffect(() => setMinScale(getChartMinAxisY(chart)), [chart.chartConfig.yAxis.min])

    const changeChartName = (target) => {
        setName(target.value)
        if (target.validity.valid) chart.setName(target.value)
    }

    return (
        <Modal centered={true} show={show} onHide={handleClose} size="lg">
            <Modal.Header className="justify-content-center">
                <b>Configuration chart</b>
            </Modal.Header>
            <Modal.Body className="row justify-content-center">
                <Container className="p-1 col-12 col-md-6">
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Chart Name</InputGroup.Text>
                        <Form.Control
                            type="text" minLength="1" maxLength="20" required
                            onChange={(e) => changeChartName(e.target)}
                            placeholder="Chart name..."
                            value={name}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Chart type</InputGroup.Text>
                        <SelectChartType chart={chart}/>
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Max scale</InputGroup.Text>
                        <Form.Control
                            type="number" step="any"
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setMaxScale, chart.setMaxAxisScaleY, parseFloat)
                            }
                            placeholder="auto"
                            value={maxScale}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mt-2">
                        <InputGroup.Text>Min scale</InputGroup.Text>
                        <Form.Control
                            type="number" step="any"
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setMinScale, chart.setMinAxisScaleY, parseFloat)
                            }
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