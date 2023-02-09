import {makeAutoObservable} from "mobx";
import Chart from "chart.js/auto";

const data = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}

class ChartStorage {
    chart = null

    constructor(name) {
        this.name = name || "Some chart"
    }

    setCtx(ctx) {
        if (Chart.getChart(ctx)) return
        this.chart = new Chart(ctx, data)
    }
}

export default ChartStorage