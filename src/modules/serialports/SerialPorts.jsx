import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Container} from "react-bootstrap";

import SerialPortList from "./components/SerialPortList";
import appStorage from "../../appStorage";


const SerialPorts = observer(() => {

    if (!navigator.serial) {
        return (
            <Container fluid className="row justify-content-center p-2">
                <Card className="text-center col col-md-8 col mt-4">
                    <Card.Header><h2 className="text-danger">Serial ports unavailable!</h2></Card.Header>
                    <Card.Body>
                        <p>
                            The Web Serial API provides a way for websites to read from and write
                            to serial devices. These devices may be connected via a serial port,
                            or be USB or Bluetooth devices that emulate a serial port.
                        </p>
                    </Card.Body>
                    <Card.Footer>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API"
                           rel="noreferrer"
                           target="_blank">
                            More information
                        </a>
                    </Card.Footer>
                </Card>
            </Container>
        )
    }

    return (
        <Container fluid className="row justify-content-center p-1">
            <h1 className="text-center mt-3">Serial ports</h1>
            <Button variant="primary" className="mt-3 col-7"
                    onClick={() => appStorage.serialManager.addSerialPort()}
            >
                Add Serial Port
            </Button>
            <SerialPortList serialPorts={appStorage.serialManager.availablePorts}/>
        </Container>
    );
});

export default SerialPorts;