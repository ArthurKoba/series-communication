import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/sass/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';

import {
    Chart as ChartJS,
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
