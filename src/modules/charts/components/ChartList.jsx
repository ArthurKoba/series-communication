import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import ChartItem from "./ChartItem";

const ChartList = observer(({charts}) => {
    return (
        <Container fluid className="row justify-content-center">
                {
                    charts.map((element, i) => <ChartItem key={i} chart={element}/>)
                }
        </Container>
    );
});

export default ChartList;