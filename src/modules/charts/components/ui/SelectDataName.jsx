import React from 'react';
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const SelectDataName = observer(({chart}) => {
    const needAddUnknownSelect = !!(!chart.availableDataNames.includes(chart.selectedDataName) && chart.selectedDataName)

    return (
        <Form.Select defaultValue={chart.selectedDataName || ""} onChange={(e) => chart.setDataName(e.target.value)}>
            <option value="">All dataNames</option>
            {needAddUnknownSelect? <option disabled value={chart.selectedDataName}>{chart.selectedDataName}</option> : ""}
            {
                chart.availableDataNames.map((dataName, index) =>
                    <option
                        key={index}
                        value={dataName || ""}>
                        {dataName || "All dataNames"}
                    </option>
                )
            }
        </Form.Select>
    );
});

export default SelectDataName;