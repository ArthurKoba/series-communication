import React from 'react';
import {observer} from "mobx-react-lite";

import serialPortsStorage from "../../store/serialManagerStorage";
import SerialPortItem from "../../pages/SerialPortItem";

const SerialPortList = observer(() => {

    if (!serialPortsStorage.availablePorts.length) return (
        <div><h1>Порты не установлены или загружаются.</h1></div>
    )

    return (
        <div className="container-fluid d-flex justify-content-evenly">
            {
                serialPortsStorage.availablePorts.map((port, i) =>
                    <SerialPortItem key={i} proxyPortObject={port}></SerialPortItem>
                )
            }
        </div>
    );
});

export default SerialPortList;