import React from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SelectDataName = observer(({chart}) => {
    return (
        <Form.Select defaultValue={chart.selectedDataName} onChange={(e) => chart.setDataName(e.target.value)}>
            <option value="">ALL DATA</option>
            {
                chart.availableDataNames.map((dataName, index) =>
                    <option key={index} value={dataName}>{dataName}</option>
                )
            }
        </Form.Select>
    );
});

export default SelectDataName;