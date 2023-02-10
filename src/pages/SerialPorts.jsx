import React from 'react';

import SerialPortList from "../components/serial-ports/SerialPortList";
import serialManagerStorage from "../store/serialManagerStorage";

const SerialPorts = () => {
    if (!navigator.serial) {
        return (
            <div className="text-center d-flex justify-content-center"><div className="col-6">
                <h1>Serial ports unavailable!</h1>
                <p>
                    The Web Serial API provides a way for websites to read from and write
                    to serial devices. These devices may be connected via a serial port,
                    or be USB or Bluetooth devices that emulate a serial port.
                </p>
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API" target="_blank">
                    More information
                </a>
            </div></div>
        )
    }
    return (
        <div className="container-fluid row justify-content-center">
            <h1 className="text-center mt-3">Serial ports</h1>

            <button className="btn btn-primary mt-3 col-6" onClick={() => serialManagerStorage.getPorts()}>
                Add System Port
            </button>
            <SerialPortList></SerialPortList>
        </div>
    );
};

export default SerialPorts;