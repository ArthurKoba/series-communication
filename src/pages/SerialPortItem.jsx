import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";

const SerialPortItem = ({port}) => {

    return (
        <div className="card col-4">
            <div className="card-header row">
                <span>name: {port.name}</span>
            </div>
            <div className="card-body row">
                <ButtonGroup>
                    <Button className="btn-success btn-sm" active={port.isConnected} onClick={() => port.connect()}>
                        Connect
                    </Button>
                    <Button className="btn-danger btn-sm" active={!port.isConnected} onClick={() => port.disconnect()}>
                        Disconnect
                    </Button>
                </ButtonGroup>
            </div>
            <div className="card-footer row">
                <span>usbProductId: {port.usbProductId}</span>
                <span>usbVendorId: {port.usbVendorId}</span>
            </div>


        </div>
    );
};

export default SerialPortItem;