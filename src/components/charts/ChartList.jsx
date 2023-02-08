import React from 'react';
import {Container, Row} from "react-bootstrap";
import ChartItem from "./ChartItem";

const ChartList = ({charts}) => {
    return (
        <Container fluid>
            <Row>
                {charts.map((chart) => <ChartItem chart={chart}></ChartItem>)}
            </Row>
        </Container>
    );
};

export default ChartList;