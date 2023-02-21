import React from 'react';
import {Form} from "react-bootstrap";

const SelectChartType = ({chart}) => {

    return (
        <Form.Select defaultValue={chart} onChange={(e) => chart.setType(e.target.value)}>
            <option disabled>Select chart type</option>
            {
                // chartTypes.map((option, index) =>
                //     <option key={index} value={option.type}>{option.name}</option>)
            }
        </Form.Select>
    );
};

export default SelectChartType;