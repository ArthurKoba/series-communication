import React from 'react';

import {Bar} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartItem = ({chart}) => {
    const options = {
        responsive: true,
        animation: {
          duration: 0
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chart.name,
            },
        },
    }

    return (
        <Bar options={options} data={chart.data}></Bar>
    )
};

export default ChartItem;