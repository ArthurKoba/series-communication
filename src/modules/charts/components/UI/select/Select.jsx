import React from 'react';
import {FormSelect} from "react-bootstrap";


const Select = ({options, onChange}) => {
    return (
        <FormSelect onChange={(e) => onChange(e.target.value)}>
            {
                options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )
            }
        </FormSelect>
    );
};

export default Select;