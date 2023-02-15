

class DataStream {

    charts = []

    constructor(config) {
        this.id = config.id
        this.resource = config.resource
        this.type = config.type
        this.handler = this.handler.bind(this)
        this.charts = config.charts
        this.resource.setHandler(this.handler)
    }

    handler(data) {
        for (let chart of this.charts) {
            chart.updateData(data)
        }
    }


}

export default DataStream