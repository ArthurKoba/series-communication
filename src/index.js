import React from 'react';
import ReactDOM from 'react-dom/client';

import HighCharts from "highcharts"
import HighchartsBoost from "highcharts/modules/boost"

import "./app.scss"
import App from './App';


HighchartsBoost(HighCharts)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
