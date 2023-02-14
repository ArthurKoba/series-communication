import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import SelectChartType from "./ui/SelectChartType";

const ChartItemConfiguration = ({chart}) => {
    const [maxScale, setMaxScale] = useState("")
    const [minScale, setMinScale] = useState("")
    // const [maxScaleInvalid, setMaxScaleInvalid] = useState("")

    const changeMaxScale = (value) => {
        setMaxScale(value)
        value = parseFloat(value)
        if (value) chart.setMaxScale(value)
    }

    const changeMinScale = (value) => {
        setMinScale(value)
        value = parseFloat(value)
        if (value) chart.setMinScale(value)
    }

    return (
        <Container fluid className="row col-6 p-3">
            <SelectChartType chart={chart}/>
            <Button onClick={() => chart.click()}>click</Button>
            <InputGroup size="sm" className="mb-2">
                <InputGroup.Text>Min scale</InputGroup.Text>
                <Form.Control onChange={(e) => changeMinScale(e.target.value)}
                              value={minScale}
                              placeholder="..."/>
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
                <InputGroup.Text>Max scale</InputGroup.Text>
                <Form.Control onChange={(e) => changeMaxScale(e.target.value)}
                              value={maxScale}
                              placeholder="..."/>
            </InputGroup>
        </Container>
    );
};

export default ChartItemConfiguration;