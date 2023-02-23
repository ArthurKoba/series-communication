import {makeAutoObservable} from "mobx";
import chartStorage from "./chartStorage";

class ChartManager {
    charts = []

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        let chartsConfigs = localStorage.getItem("charts")
        if (!chartsConfigs) return this.resetConfigs()
        this.charts = JSON.parse(chartsConfigs).map((config, id) =>
            new chartStorage({manager: this, configs: {id: id, ...config}})
        )
    }

    createNewChart() {
        let newChart = new chartStorage({manager: this, configs: {id: this.charts.length}})
        this.charts = [...this.charts, newChart]
        this.updateConfigs()
    }

    removeChart(chartId) {
        this.charts = this.charts.filter((chart) => chart.id !== chartId)
        this.updateConfigs()
    }

    updateConfigs() {
        localStorage.setItem("charts", JSON.stringify(
            this.charts.map((chart) => chart.getConfig())
        ))
    }

    resetConfigs() {
        this.charts = []
        localStorage.setItem("charts", "[]")
    }
}

export default ChartManager