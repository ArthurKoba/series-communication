import {action, makeAutoObservable} from "mobx";


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

    addCount = action ((value = 1) => {this.countData += value})

    handler(data) {
        this.addCount()
        for (let chart of this.charts) {
            if (chart.subscribeDataStreamType !== this.type || chart.subscribeDataStreamId !== this.id.toString())
                continue
            chart.updateData(data)
        }
    }
}

export default DataStream