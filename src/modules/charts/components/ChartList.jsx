import React from 'react';
import {Container} from "react-bootstrap";

import ChartItem from "./ChartItem";

const ChartList = ({charts}) => {
    return (
        <Container fluid className="row p-0 justify-content-center">
                {
                    charts.map((element, i) => <ChartItem key={i} chart={element}/>)
                }
        </Container>
    );
};

export default ChartList;