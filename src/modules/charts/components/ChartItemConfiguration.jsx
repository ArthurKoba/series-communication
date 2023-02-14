import React, {useState} from 'react';
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import SelectChartType from "./ui/SelectChartType";

const ChartItemConfiguration = observer(({chart}) => {
    const [maxScale, setMaxScale] = useState("")
    const [minScale, setMinScale] = useState("")
    const [minScaleInvalid, setMinScaleInvalid] = useState(false)
    const [maxScaleInvalid, setMaxScaleInvalid] = useState(false)

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
        <Container fluid className="row col-6 p-3">
            <SelectChartType chart={chart}/>
            <Button onClick={() => chart.click()}>click</Button>
            <InputGroup size="sm" className="mb-2">
                <InputGroup.Text>Min scale</InputGroup.Text>
                <Form.Control onChange={(e) => changeMinScale(e.target.value)}
                              value={minScale} isInvalid={minScaleInvalid}
                              placeholder={chart.data.options.scales.y?.min}/>
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
                <InputGroup.Text>Max scale</InputGroup.Text>
                <Form.Control onChange={(e) => changeMaxScale(e.target.value)}
                              value={maxScale} isInvalid={maxScaleInvalid}
                              placeholder={chart.data.options.scales.y?.max}/>
            </InputGroup>
        </Container>
    );
});

export default ChartItemConfiguration;