import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {changeNumberWithValidation} from "../../../shared/utils";

const GeneratorItem = observer(({generator}) => {

    const [frequency, setFrequency] = useState(generator.frequency.toString() || "");
    const [amplitude, setAmplitude] = useState(generator.amplitude.toString() || "");
    const [lengthData, setLengthData] = useState(generator.lengthData.toString() || "");
    const [delayMs, setDelayMs] = useState(generator.delayMs.toString() || "");

    return (
        <Container fluid className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2 p-1">
            <Card>
                <Card.Body className="row">
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Amplitude</InputGroup.Text>
                        <Form.Control type="number" min="1" step="any" required
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setAmplitude, generator.setAmplitude, parseFloat)
                            }
                            placeholder={generator.amplitude}
                            value={amplitude}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Frequency</InputGroup.Text>
                        <Form.Control type="number" min="0" step="any" required
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setFrequency, generator.setFrequency, parseFloat)
                            }
                            placeholder={generator.frequency}
                            value={frequency}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Length</InputGroup.Text>
                        <Form.Control type="number" min="1" step="1" required
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setLengthData, generator.setLengthData, parseInt)
                            }
                            placeholder={generator.lengthData}
                            value={lengthData}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Delay (Ms)</InputGroup.Text>
                        <Form.Control type="number" min="1" step="1" required
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setDelayMs, generator.setDelayMs, parseInt)
                            }
                            placeholder={generator.delayMs}
                            value={delayMs}
                        />
                    </InputGroup>
                    <ButtonGroup className="mb-2">
                        <Button variant={generator.isEnabled? "outline-success": "success"} size="sm"
                            disabled={generator.isEnabled}
                            active={generator.isEnabled}
                            onClick={() => generator.enable()}
                        >
                            Enable
                        </Button>
                        <Button variant={!generator.isEnabled? "outline-primary": "primary"}
                            size="sm" disabled={!generator.isEnabled}
                            active={!generator.isEnabled}
                            onClick={() => generator.disable()}
                        >
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