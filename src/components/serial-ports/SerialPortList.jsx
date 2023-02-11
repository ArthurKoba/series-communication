import React from 'react';
import {Container} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import serialPortsStorage from "../../store/serialManagerStorage";
import SerialPortItem from "./SerialPortItem";


const SerialPortList = observer(() => {

    if (!serialPortsStorage.availablePorts.length) return (
        <Container fluid className="text-center mt-3">
            <h2>Serial ports are not installed or are being loaded....</h2>
        </Container>
    )

    return (
        <Container fluid className="row justify-content-evenly mt-5">
            {
                serialPortsStorage.availablePorts.map((port, i) =>
                    <SerialPortItem key={i} port={port}></SerialPortItem>
                )
            }
        </Container>
    );
});

export default SerialPortList;