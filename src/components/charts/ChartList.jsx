import React from 'react';
import {Container, Row} from "react-bootstrap";
import ChartItem from "./ChartItem";

const ChartList = ({charts}) => {
    return (
        <Container fluid>
            <Row>
                {charts.map((chart, i) => <ChartItem key={i} chart={chart}></ChartItem>)}
            </Row>
        </Container>
    );
};

export default ChartList;