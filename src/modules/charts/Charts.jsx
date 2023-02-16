import React from 'react';
import {Button, Container} from "react-bootstrap";

import ChartList from "./components/ChartList";
import appStorage from "../../appStorage";
import {observer} from "mobx-react-lite";


const Charts = observer(() => {
    return (
        <Container fluid className="row p-0 justify-content-center">
            <h1 className="text-center">Graphs</h1>
            <Button className="col-6" onClick={() => appStorage.chartsManager.createNewChart()}>Create new chart</Button>
            <ChartList charts={appStorage.chartsManager.charts}/>
        </Container>
    );
});

export default Charts;