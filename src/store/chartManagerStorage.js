import {makeAutoObservable} from "mobx";
import chartStorage from "./chartStorage";

class ChartManager {
    count = 0
    charts = []

    constructor() {
        makeAutoObservable(this)
        this.charts.push(
            new chartStorage()
        )
    }

    increment() {
        this.count += 1
    }
}

export default new ChartManager()