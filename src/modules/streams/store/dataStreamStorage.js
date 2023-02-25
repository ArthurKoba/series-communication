import {action, makeAutoObservable} from "mobx";
import {serialPortInteraction, cobsDecoder} from "../../serialPortInteraction";


class DataStream {
    charts = []
    countData = 0

    constructor({type, resource, appStorage}) {
        this.id = resource.id
        this.resource = resource
        this.type = type
        this.charts = appStorage.chartsManager.charts
        this.handler = this.handler.bind(this)
        this.resource.setHandler(this.handler)
        makeAutoObservable(this)
        this.byteBuffer = []
    }

    updateCharts(charts) {
        this.charts = charts
    }

    addCount = action ((value = 1) => {this.countData += value})


    writeDataToCharts({dataName, data}) {
        for (let chart of this.charts) {
            if (chart.subscribeDataStreamType !== this.type || chart.subscribeDataStreamId !== this.id.toString())
                continue
            chart.updateData({dataName, data})
        }
        this.addCount()
    }

    handler(resourceType, buffer) {
        if (resourceType === "generator") {
            return this.writeDataToCharts({dataName: null, data: buffer})
        }
        console.log(resourceType, buffer)
        // this.addCount()

        /**
         * @type {number[]}
         */
        // let cobsData = cobsDecoder.decode(buffer);
        // if (cobsData.length) {
        //     let packet
        //     try {
        //         packet = serialPortInteraction.parsePacket(cobsData)
        //         console.log(packet)
        //     } catch (e) {
        //         console.warn("packet parse failed")
        //     }
        // } else {
        //     // todo fix types
        //     const byteBuffer = new Uint8Array(buffer, 0, buffer.length)
        //     const string = new TextDecoder().decode(byteBuffer)
        //     console.log(string)
        // }
        // if (type === "raw") {
        //     return console.log(data)
        // }
        //
    }
}

export default DataStream