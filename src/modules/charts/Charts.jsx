import React from 'react';
import {Container} from "react-bootstrap";

import ChartList from "./components/ChartList";


const Charts = () => {
    return (
        <Container fluid className="row justify-content-center">
            <h1 className="text-center">Графики</h1>
            <ChartList/>
        </Container>
    );
};

export default Charts;