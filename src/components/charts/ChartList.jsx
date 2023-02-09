import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Row} from "react-bootstrap";

import chartManagerStorage from "../../store/chartManagerStorage";
import ChartItem from "./ChartItem";

const ChartList = observer(() => {
    return (
        <Container fluid>
            <Row>
                {
                    chartManagerStorage.charts.map((element, i) =>
                        <ChartItem key={i} chartStorage={element}></ChartItem>
                    )
                }
            </Row>
        </Container>
    );
});

export default ChartList;