import React from 'react';
import {Button, ButtonGroup, Card, Form, InputGroup} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {observer} from "mobx-react-lite";


const SerialPortItem = observer(({port}) => {

    const changeName = (newName) => newName.length? port.setName(newName) : ""


    return (
        <Card className="col-4">
            <CardHeader className="row">
                <span>Name: {port.name || "null"}</span>
            </CardHeader>
            <div className="card-body row">
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>Name</InputGroup.Text>
                    <Form.Control
                        onBlur={(e) => changeName(e.target.value)}
                        placeholder={port.name || "null"}
                        disabled={!port.usbVendorId && !port.usbProductId}
                    />
                </InputGroup>
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>BaudRate</InputGroup.Text>
                    <Form.Control placeholder="115200"/>
                </InputGroup>
                <ButtonGroup className="mb-2">
                    <Button variant={port.isConnected? "outline-secondary": "success"}
                            size="sm" active={port.isConnected}
                            onClick={() => port.connect()}>
                        Connect
                    </Button>
                    <Button variant={!port.isConnected? "outline-secondary": "danger"}
                            size="sm" active={!port.isConnected}
                            onClick={() => port.disconnect()}>
                        Disconnect
                    </Button>
                </ButtonGroup>
            </div>
            <div className="card-footer row text-center">
                <span>usbProductId: {port.usbProductId || "null"}</span>
                {/*<div className="vr"></div>*/}
                <hr className="m-2 mx-0"/>
                <span>usbVendorId: {port.usbVendorId || "null"}</span>
            </div>


        </Card>
    );
});

export default SerialPortItem;