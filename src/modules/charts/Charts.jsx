import React from 'react';
import {Container} from "react-bootstrap";

import ChartList from "./components/ChartList";
import appStorage from "../../appStorage";
import {observer} from "mobx-react-lite";


const Charts = observer(() => {
    return (
        <Container fluid className="p-0">
            <h1 className="text-center">Графики</h1>
            <ChartList charts={appStorage.chartsManager.charts}/>
        </Container>
    );
});

export default Charts;