import React from 'react';
import {Button, Container} from "react-bootstrap";

import serialManagerStorage from "./store/serialManagerStorage";
import SerialPortList from "./components/SerialPortList";

const SerialPorts = () => {

    const addSerialPort = () => {
        navigator.serial.requestPort()
            .then(serialManagerStorage.loadPorts)
            .catch((e) => console.warn(e))
    }

    if (!navigator.serial) {
        return (
            <Container fluid className="row text-center col-6 mt-4">
                <h1>Serial ports unavailable!</h1>
                <p>
                    The Web Serial API provides a way for websites to read from and write
                    to serial devices. These devices may be connected via a serial port,
                    or be USB or Bluetooth devices that emulate a serial port.
                </p>
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API"
                   rel="noreferrer"
                   target="_blank">
                    More information
                </a>
            </Container>
        )
    }

    return (
        <Container fluid className="row justify-content-center">
            <h1 className="text-center mt-3">Serial ports</h1>
            <Button variant="primary" className="mt-3 col-7" onClick={addSerialPort}>Add System Port</Button>
            <Button variant="primary" className="mt-3 col-7" onClick={serialManagerStorage.loadPorts}>Update</Button>
            <SerialPortList></SerialPortList>
        </Container>
    );
};

export default SerialPorts;