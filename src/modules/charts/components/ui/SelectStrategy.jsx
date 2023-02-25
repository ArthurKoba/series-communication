import React from 'react';
import {Form} from "react-bootstrap";

import {strategies} from "../../strategies";


const SelectStrategy = ({chart}) => {
    const strategyType = chart.strategy? chart.strategy.type : ""
    return (
        <Form.Select defaultValue={strategyType}
                     onChange={(e) => chart.setStrategy(e.target.value)}>
            <option value="">Absent</option>
            {

                strategies.map((strategy, index) =>
                    <option key={index} value={strategy.type}>{strategy.type}</option>)
            }
        </Form.Select>
    );
};

export default SelectStrategy;