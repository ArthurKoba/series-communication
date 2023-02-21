import React from 'react';
import {Form} from "react-bootstrap";
import {chartTypes} from "../../configs/chartTypes";


const SelectChartType = ({chart}) => {
    return (
        <Form.Select defaultValue={chart.chartConfig.chart.type} onChange={(e) => chart.setType(e.target.value)}>
            {
                chartTypes.map((option, index) =>
                    <option key={index} value={option.type}>{option.name}</option>)
            }
        </Form.Select>
    );
};

export default SelectChartType;