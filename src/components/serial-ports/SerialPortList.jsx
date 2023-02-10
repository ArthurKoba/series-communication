import React from 'react';
import {observer} from "mobx-react-lite";

import serialPortsStorage from "../../store/serialManagerStorage";
import SerialPortItem from "../../pages/SerialPortItem";

const SerialPortList = observer(() => {

    if (!serialPortsStorage.availablePorts.length) return (
        <div><h1>Порты не установлены или загружаются.</h1></div>
    )

    return (
        <div className="container-fluid row  justify-content-evenly mt-5">
            {
                serialPortsStorage.availablePorts.map((port, i) =>
                    <SerialPortItem key={i} port={port}></SerialPortItem>
                )
            }
        </div>
    );
});

export default SerialPortList;