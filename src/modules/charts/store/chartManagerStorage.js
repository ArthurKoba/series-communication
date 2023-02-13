import {makeAutoObservable} from "mobx";
import chartStorage from "./chartStorage";

class ChartManager {
    charts = []

    constructor() {
        this.charts.push(
            new chartStorage({manager: this})
        )
        makeAutoObservable(this)
    }

    deleteChart(chart) {
        this.charts = this.charts.filter(c => c !== chart)
    }
}

export default ChartManager