import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import ChartItem from "./ChartItem";
import chartManagerStorage from "../store/chartManagerStorage";

const ChartList = observer(() => {
    return (
        <Container fluid className="row justify-content-center">
                {
                    chartManagerStorage.charts.map((element, i) =>
                        <ChartItem key={i} chartStorage={element}></ChartItem>
                    )
                }
        </Container>
    );
});

export default ChartList;