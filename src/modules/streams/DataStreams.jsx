import React from 'react';
import {Container} from "react-bootstrap";

import DataStreamList from "./components/DataStreamList";
import appStorage from "../../appStorage";

const DataStreams = () => {
    return (
        <Container fluid className="row">
            <DataStreamList serial={appStorage.streamsManager.serialStreams}/>
        </Container>
    );
};

export default DataStreams;