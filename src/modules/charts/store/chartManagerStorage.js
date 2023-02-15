import {makeAutoObservable} from "mobx";
import chartStorage from "./chartStorage";

class ChartManager {
    charts = []
    
    constructor() {
        makeAutoObservable(this)
    }

    init() {
        let chartConfigs = JSON.parse(localStorage.getItem("charts"))
        if (!chartConfigs) return
        chartConfigs = chartConfigs.filter((element) => element !== null)
        this.charts = chartConfigs.map(
            (config, id) => new chartStorage({manager: this, configs: {id: id, ...config}})
        )
    }

    deleteChart(chart) {
        this.charts = this.charts.filter((chart) => chart.id !== chart)
        let configs = JSON.parse(localStorage.getItem("charts"))
        delete configs[chart.id]
        this.charts = this.charts.filter((element) => element.id !== chart.id)
        localStorage.setItem("charts", JSON.stringify(configs))
    }

    updateChartConfig(chartConfig) {
        let configs = JSON.parse(localStorage.getItem("charts"))
        if (!configs) configs = [chartConfig]
        else configs[chartConfig.id] = chartConfig
        localStorage.setItem("charts", JSON.stringify(configs))
    }

}

export default ChartManager