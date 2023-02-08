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

    const data = {
        labels: chart.labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: chart.data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return (
        <Bar options={options} data={data}></Bar>
    )
};

export default ChartItem;