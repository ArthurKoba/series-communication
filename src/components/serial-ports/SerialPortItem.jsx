import React from 'react';
import {Button, ButtonGroup, Card, Form, InputGroup} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {observer} from "mobx-react-lite";


const SerialPortItem = observer(({port}) => {

    const state = port.isConnected? "Connected" : port.isConnecting? "Connecting" : "Disconnected"

    const getStateVariantButton = () => {
        let state = "outline-"
        if (port.isConnected) state += "success"
        else if (port.isConnecting) state += "warning"
        else state += "danger"
        return state
    }



    const changeBaudRate = (event) => {
        let value = Number(event.target.value)
        switch (event.type) {
            case "change":
                port.checkBaudRate(value);
                break;
            case "blur":
                if (port.isBaudRateValid !== true) return
                port.setBaudRate(value)
                port.isBaudRateValid = null
                break;
        }
    }

    return (
        <Card className="col-4">
            <CardHeader className="row">
                <span>Name: {port.name || "null"}</span>
            </CardHeader>
            <div className="card-body row">
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Name</InputGroup.Text>
                    <Form.Control
                        onBlur={(e) => port.setName(e.target.value)}
                        placeholder={port.name || "null"}
                        disabled={!port.usbVendorId && !port.usbProductId}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>BaudRate</InputGroup.Text>
                    <Form.Control isInvalid={port.isBaudRateValid === false}
                                  onChange={changeBaudRate}
                                  onBlur={changeBaudRate}
                                  placeholder="115200"/>
                </InputGroup>
                <ButtonGroup className="mb-2">
                    <Button variant={port.isConnected? "outline-secondary": "success"}
                            size="sm" disabled={port.isBaudRateValid === false || port.isConnected}
                            active={port.isConnected}
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
                        {state}
                    </Button>
                </ButtonGroup>
            </div>
            <div className="card-footer row text-center">
                <span>usbProductId: {port.usbProductId || "null"}</span>
                <hr className="m-2 mx-0"/>
                <span>usbVendorId: {port.usbVendorId || "null"}</span>
            </div>


        </Card>
    );
});

export default SerialPortItem;