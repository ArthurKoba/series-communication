import React from 'react';
import {Container} from "react-bootstrap";

import ChartList from "./components/ChartList";
import appStorage from "../../appStorage";


const Charts = () => {
    return (
        <Container fluid className="row justify-content-center">
            <h1 className="text-center">Графики</h1>
            <ChartList charts={appStorage.chartsManager.charts}/>
        </Container>
    );
};

export default Charts;