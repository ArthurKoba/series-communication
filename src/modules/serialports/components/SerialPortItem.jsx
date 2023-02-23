import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";
import {changeNumberWithValidation} from "../../../shared/utils";


const SerialPortItem = observer(({port}) => {
    const [baudRate, setBaudRate] = useState(port.baudRate.toString() || "")
    const [portName, setPortName] = useState(port.name || "")
    const [autoOpen, setAutoOpen] = useState(Boolean(port.isAutoOpen))

    const state = port.isConnected? "Connected" : port.isConnecting? "Connecting" : "Disconnected"

    const getStateVariantButton = () => {
        if (port.isConnected) return "success"
        else if (port.isConnecting) return "warning"
        else return "danger"
    }

    const changeName = (value) => {
        setPortName(value)
        port.setName(value)
    }

    const changeAutoOpen = (value) => {
        setAutoOpen(value)
        port.setAutoOpen(value)
    }

     return (
        <Container className="p-1 col-12 col-md-6 col-lg-4">
            <Card className={"border border-" + getStateVariantButton()}>
                <Card.Header className="d-grid gap-2">
                    <Button size="sm" disabled variant={getStateVariantButton()}>
                        {state} {port.isConnected? ": " + port.baudRate.toString() : ""}
                    </Button>
                </Card.Header>
                <Card.Body className="row">
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control type="text" minLength="1" maxLength="20"
                            onChange={(e) => changeName(e.target.value)}
                            placeholder="COM..."
                            value={portName}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text>BaudRate</InputGroup.Text>
                        <Form.Control type="number" min="1" max="5000000" step="1" required
                            onChange={(e) =>
                                changeNumberWithValidation(e.target, setBaudRate, port.setBaudRate, parseInt)
                            }
                            disabled={port.isConnected || port.isConnecting}
                            value={baudRate}
                            placeholder="115200"
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-2">
                        <Form.Check
                            type="switch"
                            checked={autoOpen}
                            onChange={(e) => changeAutoOpen(e.target.checked)}
                        />
                        <Form.Check.Label><small>Automatically open port</small></Form.Check.Label>
                    </InputGroup>
                    <ButtonGroup className="mb-2">
                        <Button size="sm"
                            variant={port.isConnected? "outline-success": "success"}
                            disabled={port.isConnecting || port.isConnected}
                            active={!port.isConnected}
                            onClick={() => port.connect()}
                        >
                            Connect
                        </Button>
                        <Button size="sm"
                            variant={!port.isConnected? "outline-secondary": "danger"}
                            disabled={!port.isConnected}
                            active={!port.isConnected}
                            onClick={() => port.disconnect()}
                        >
                            Disconnect
                        </Button>
                    </ButtonGroup>
                </Card.Body>
                <Card.Footer>
                    <Container className="d-flex justify-content-between">
                        <small>Type: <b>{port.id === "virtual"? "Virtual": "USB"}</b></small>
                        {port.id !== "virtual"?
                            <small>
                                Vendor ID: <b>{port.usbVendorId.toString(16)} </b>
                                Product ID: <b>{port.usbProductId.toString(16)}</b>
                            </small>
                            : ""
                        }
                    </Container>
                </Card.Footer>
            </Card>
        </Container>
    );
});

export default SerialPortItem;