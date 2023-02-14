import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const GeneratorItem = observer(({generator}) => {

    const [frequency, setFrequency] = useState("");
    const [frequencyInvalid, setFrequencyInvalid] = useState(false)

    const handlerSetFrequency = (value) => {
        setFrequency(value)
        value = parseFloat(value)
        if (isNaN(value)) return setFrequencyInvalid(true)
        setFrequencyInvalid(false)
        generator.setFrequency(value)
    }

    return (
        <Container fluid className="col-6 mt-2">
            <Card>
                <Card.Body className="row">
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Frequency</InputGroup.Text>
                        <Form.Control
                            onChange={(e) => handlerSetFrequency(e.target.value)}
                            placeholder={generator.frequency}
                            isInvalid={frequencyInvalid}
                            value={frequency}
                        />
                    </InputGroup>
                    <ButtonGroup className="mb-2">
                        <Button variant={generator.isEnabled? "outline-success": "success"} size="sm"
                                disabled={generator.isEnabled}
                                active={generator.isEnabled}
                                onClick={() => generator.enable()}>
                            Enable
                        </Button>
                        <Button variant={!generator.isEnabled? "outline-secondary": "secondary"}
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