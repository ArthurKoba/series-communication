import React from 'react';
import {Form} from "react-bootstrap";

const SelectDataName = ({chart}) => {
    console.log(chart.selectedDataName)
    return (
        <Form.Select defaultValue={chart.selectedDataName || ""}
                     onChange={(e) => chart.setDataName(e.target.value)}>
            <option value="">All data</option>
            {
                chart.availableDataNames.map((name, index) =>
                    <option key={index} value={name}>{name}</option>)
            }
        </Form.Select>
    );
};

export default SelectDataName;