import {makeAutoObservable} from "mobx";
import chartStorage from "./chartStorage";

class ChartManager {
    charts = []

    constructor() {
        makeAutoObservable(this)
        this.charts.push(
            new chartStorage()
        )
    }

    deleteChart(chart) {
        this.charts = this.charts.filter(c => c !== chart)
    }
}

export default ChartManager