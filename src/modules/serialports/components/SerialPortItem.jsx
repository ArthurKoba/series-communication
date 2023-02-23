import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Card, Container, Form, InputGroup} from "react-bootstrap";


const SerialPortItem = observer(({port}) => {
    const [baudRateInput, setBaudRateInput] = useState(port.baudRate.toString())
    const [portName, setPortName] = useState(port.name || "")

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

    const changeBaudRate = (value) => {
        setBaudRateInput(value)
        port.setBaudRate(Number(value))
    }

    return (
        <Card className="col-4">
            <Card.Header className="row">
                <span>Name: {port.name || "null"}</span>
            </Card.Header>
            <Card.Body className="row">
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Name</InputGroup.Text>
                    <Form.Control
                        onBlur={(e) => port.setName(e.target.value)}
                        placeholder={port.name}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>BaudRate</InputGroup.Text>
                    <Form.Control isInvalid={isBaudRateValid === false}
                                  onChange={changeBaudRate}
                                  disabled={port.isConnected || port.isConnecting}
                                  value={baudRateInput}
                                  placeholder="115200"/>
                </InputGroup>
                <ButtonGroup className="mb-2">
                    <Button variant={port.isConnected? "outline-success": "success"} size="sm"
                            disabled={!isBaudRateValid || port.isConnecting || port.isConnected}
                            active={!port.isConnected}
                            onClick={() => port.connect()}>
                        Connect
                    </Button>
                    <Button variant={!port.isConnected? "outline-secondary": "danger"}
                            size="sm" disabled={!port.isConnected}
                            active={!port.isConnected}
                            onClick={() => port.disconnect()}>
                        Disconnect
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="mb-2">
                    <Button variant={getStateVariantButton()}
                            disabled={true} size="sm">
                        {state} {port.isConnected? ": " + port.baudRate.toString() : ""}
                    </Button>
                </ButtonGroup>
            </Card.Body>
            <Card.Footer className="row text-center">
                <span>usbProductId: {port.usbProductId || "virtual"}</span>
                <hr className="m-2 mx-0"/>
                <span>usbVendorId: {port.usbVendorId || "virtual"}</span>
            </Card.Footer>
        </Card>
    );
});

export default SerialPortItem;