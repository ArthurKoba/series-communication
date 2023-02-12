import React from 'react';
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const GeneratorItem = observer(({generator}) => {

    return (
        <Container fluid className="col-6 mt-2">
            <Card>
                <Card.Header className="text-center">
                    <span>{generator.name}</span>
                </Card.Header>
                <Card.Body className="row">
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control
                            onBlur={(e) => generator.setName(e.target.value)}
                            placeholder={generator.name}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Frequency</InputGroup.Text>
                        <Form.Control
                            onBlur={(e) => generator.setFrequency(Number.parseFloat(e.target.value))}
                            placeholder={generator.frequency}
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
                </Card.Body>
            </Card>
        </Container>
    );
});

export default GeneratorItem;