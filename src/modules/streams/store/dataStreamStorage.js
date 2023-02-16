import {makeAutoObservable} from "mobx";


class DataStream {

    charts = []
    countData = 0

    constructor(config) {
        this.id = config.id
        this.resource = config.resource
        this.type = config.type
        this.handler = this.handler.bind(this)
        this.charts = config.charts
        this.resource.setHandler(this.handler)
        makeAutoObservable(this)
    }

    handler(data) {
        this.countData += 1
        for (let chart of this.charts) {
            chart.updateData(data)
        }
    }
}

export default DataStream