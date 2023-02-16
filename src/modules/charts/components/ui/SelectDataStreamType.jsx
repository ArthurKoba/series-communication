import React from 'react';
import {Form} from "react-bootstrap";
import {streamTypesList} from "../../../streams/streamTypes";

const SelectDataStreamType = ({chart}) => {
    return (
        <Form.Select defaultValue={chart.subscribeDataStreamType}
                     onChange={(e) => chart.setSubscribeDataStreamType(e.target.value)}>
            <option value="">Not data stream type</option>
            {
                streamTypesList.map((option, index) =>
                    <option key={index} value={option.value}>{option.name}</option>)
            }
        </Form.Select>
    );
};

export default SelectDataStreamType;