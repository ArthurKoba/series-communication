import {action, makeAutoObservable, reaction} from "mobx";


class DataStream {
    charts = []
    countData = 0

    constructor({type, resource, appStorage}) {
        this.id = resource.id
        this.resource = resource
        this.type = type
        this.handler = this.handler.bind(this)
        this.resource.setHandler(this.handler)
        makeAutoObservable(this)

        this.reactionUpdateCharts = reaction(
            () => appStorage.chartsManager.charts,
            (charts) => {
                console.log("reaction")
                this.charts = charts
            }
        )
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