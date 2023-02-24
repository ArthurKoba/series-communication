import React from 'react';

import {popularBaudRates} from "../../configs/popularBaudRates";


const DataListPopularBaudRates = ({id}) => {
    return (
        <datalist id={id}>
            {
                popularBaudRates.map((speed, index) =>
                    <option key={index} value={speed.toString()}/>
                )
            }
        </datalist>
    );
};

export default DataListPopularBaudRates;