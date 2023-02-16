import React from 'react';
import {Container} from "react-bootstrap";

import DataStreamList from "./components/DataStreamList";
import appStorage from "../../appStorage";

const DataStreams = () => {
    return (
        <Container fluid className="row">
            <DataStreamList name="serial streams" resource={appStorage.streamsManager.serialStreams}/>
            <DataStreamList name="generators streams" resource={appStorage.streamsManager.generatorStreams}/>
        </Container>
    );
};

export default DataStreams;