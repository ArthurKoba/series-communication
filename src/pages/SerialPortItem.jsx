import React, {useEffect, useState} from 'react';

const SerialPortItem = ({proxyPortObject}) => {

    const port = proxyPortObject[0]

    const initPort = () => {
        // setPortData(port.getInfo())
        // console.log(port)
    }
    useEffect(initPort, [])

    return (
        <div className="card">
            <span>name: {port.name}</span>
            <span>usbProductId: {port.usbProductId}</span>
            <span>usbVendorId: {port.usbVendorId}</span>
            {/*<Button active={portConnected} className="btn-success" onClick={connect}>Connect</Button>*/}
            {/*<Button active={!portConnected} className="btn-danger" onClick={disconnect}>Disconnect</Button>*/}

        </div>
    );
};

export default SerialPortItem;