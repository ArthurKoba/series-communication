import {makeAutoObservable} from "mobx";


class ChartManager {
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count += 1
        console.log("inc")
    }
}

export default new ChartManager()