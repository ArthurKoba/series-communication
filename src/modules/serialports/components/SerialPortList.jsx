import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import SerialPortItem from "./SerialPortItem";

const SerialPortList = observer(({serialPorts}) => {

    if (!serialPorts.length) return (
        <Container fluid className="text-center mt-3">
            <h2>Serial ports are not installed or are being loaded....</h2>
        </Container>
    )

    return (
        <Container fluid className="row justify-content-evenly mt-5">
            {
                serialPorts.map((port, i) => <SerialPortItem key={i} port={port}/>)
            }
        </Container>
    );
});

export default SerialPortList;