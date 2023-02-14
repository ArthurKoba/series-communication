import React from 'react';
import {Button, Container} from "react-bootstrap";
import SelectChartType from "./ui/SelectChartType";

const ChartItemConfiguration = ({chart}) => {
    return (
        <Container fluid className="row col-6 p-3">
            <SelectChartType chart={chart}/>
            <Button onClick={() => chart.click()}>click</Button>
        </Container>
    );
};

export default ChartItemConfiguration;