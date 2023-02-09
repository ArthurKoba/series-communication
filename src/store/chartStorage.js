import {makeAutoObservable} from "mobx";
import Chart from "chart.js/auto";

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }
    ]
}

const options = {
    responsive: true,
    animation: {duration: 0},
    elements: {
        point: {radius: 0},
        line: {
            borderColor: "#F00",
            borderWidth: 1,
        }
    },
    plugins: {
        legend: {position: 'top'},
        title: {display: true, text: "Some chart"},
    },
    scales: {y: {}}
}

class ChartStorage {
    chart = null
    data = {type: "line", options: {...options}, data: {...data}}

    constructor(name) {
        if (name) this.data.options.plugins.legend = name
    }

    setCtx(ctx) {
        if (Chart.getChart(ctx)) return
        this.chart = new Chart(ctx, this.data)
    }

    click() {
        this.chart.data.datasets[0].data = [1, 2, 3]
        this.chart.data.labels = ["1", "3", "2"]
        this.chart?.update()
    }

    setType(type) {
        this.data.type = type
        this.chart?.update()
    }
}

export default ChartStorage