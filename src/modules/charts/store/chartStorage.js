import {makeAutoObservable} from "mobx";
import Chart from "chart.js/auto";

import {defaultOptions} from "../configs/chartjsdefault"

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

class ChartStorage {
    chart = null
    data = {type: "line", options: {...defaultOptions}, data: {...data}}

    constructor({manager, configs}) {
        this.id = configs.id
        this.isFullScreen = configs?.fullscreen || false
        this.manager = manager
        makeAutoObservable(this)
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
        this.updateConfigs()
    }

    swapFullscreen() {
        this.isFullScreen = !this.isFullScreen
        this.updateConfigs()
    }

    updateConfigs() {
        this.manager.updateChartConfig({
            id: this.id, fullscreen: this.isFullScreen, type: this.data.type
        })
    }

    remove = () => this.manager.deleteChart(this)
}

export default ChartStorage