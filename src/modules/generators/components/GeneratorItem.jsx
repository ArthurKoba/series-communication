import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const GeneratorItem = observer(({generator}) => {

    const [frequency, setFrequency] = useState("");
    const [frequencyInvalid, setFrequencyInvalid] = useState(false)

    const [amplitude, setAmplitude] = useState("");
    const [amplitudeInvalid, setAmplitudeInvalid] = useState(false)

    const [lengthData, setLengthData] = useState("");
    const [lengthDataInvalid, setLengthDataInvalid] = useState(false)

    const [delayMs, setDelayMs] = useState("");
    const [delayMsInvalid, setDelayMsInvalid] = useState(false)

    const handlerSetFrequency = (value) => {
        setFrequency(value)
        value = parseFloat(value)
        if (isNaN(value) || value === 0.0) return setFrequencyInvalid(true)
        setFrequencyInvalid(false)
        generator.setFrequency(value)
    }

    const handlerSetLengthData = (value) => {
        setLengthData(value)
        value = parseInt(value)
        if (isNaN(value) || value === 0) return setLengthDataInvalid(true)
        setLengthDataInvalid(false)
        generator.setLengthData(value)
    }

    const handlerSetDelay = (value) => {
        setDelayMs(value)
        value = parseInt(value)
        if (isNaN(value) || value === 0) return setDelayMsInvalid(true)
        setDelayMsInvalid(false)
        generator.setDelayMs(value)
    }

    const handlerSetAmplitude = (value) => {
        setAmplitude(value)
        value = parseInt(value)
        if (isNaN(value) || value < 1) return setAmplitudeInvalid(true)
        setAmplitudeInvalid(false)
        generator.setAmplitude(value)
    }

    return (
        <Container fluid className="col col-sm-6 col-md-4 col-lg-3 mt-2 p-1">
            <Card>
                <Card.Body className="row">
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Amplitude</InputGroup.Text>
                        <Form.Control type="number"
                            onChange={(e) => handlerSetAmplitude(e.target.value)}
                            placeholder={generator.amplitude}
                            isInvalid={amplitudeInvalid}
                            value={amplitude}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Frequency</InputGroup.Text>
                        <Form.Control type="number"
                            onChange={(e) => handlerSetFrequency(e.target.value)}
                            placeholder={generator.frequency}
                            isInvalid={frequencyInvalid}
                            value={frequency}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Length</InputGroup.Text>
                        <Form.Control type="number"
                            onChange={(e) => handlerSetLengthData(e.target.value)}
                            placeholder={generator.lengthData}
                            isInvalid={lengthDataInvalid}
                            value={lengthData}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Delay (Ms)</InputGroup.Text>
                        <Form.Control type="number"
                            onChange={(e) => handlerSetDelay(e.target.value)}
                            placeholder={generator.delayMs}
                            isInvalid={delayMsInvalid}
                            value={delayMs}
                        />
                    </InputGroup>

                    <ButtonGroup className="mb-2">
                        <Button variant={generator.isEnabled? "outline-success": "success"} size="sm"
                                disabled={generator.isEnabled}
                                active={generator.isEnabled}
                                onClick={() => generator.enable()}>
                            Enable
                        </Button>
                        <Button variant={!generator.isEnabled? "outline-primary": "primary"}
                                size="sm" disabled={!generator.isEnabled}
                                active={!generator.isEnabled}
                                onClick={() => generator.disable()}>
                            Disable
                        </Button>
                    </ButtonGroup>
                    <Button variant="danger" size="sm" onClick={() => generator.remove()}>Remove</Button>
                </Card.Body>
            </Card>
        </Container>
    );
});

export default GeneratorItem;