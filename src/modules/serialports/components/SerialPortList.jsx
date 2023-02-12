import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import SerialPortItem from "./SerialPortItem";
import serialManagerStorage from "../store/serialManagerStorage";


const SerialPortList = observer(() => {

    if (!serialManagerStorage.availablePorts.length) return (
        <Container fluid className="text-center mt-3">
            <h2>Serial ports are not installed or are being loaded....</h2>
        </Container>
    )

    return (
        <Container fluid className="row justify-content-evenly mt-5">
            {
                serialManagerStorage.availablePorts.map((port, i) =>
                    <SerialPortItem key={i} port={port}></SerialPortItem>
                )
            }
        </Container>
    );
});

export default SerialPortList;