import {reaction} from "mobx";

import DataStream from "./dataStreamStorage";


class DataStreamManager {
    serialStreams = []
    generatorStreams = []
    charts = []

    constructor() {}

    init(appStorage) {

        this.reactionUpdateCharts = reaction(
            () => appStorage.chartsManager.charts,
            (charts) => this.charts = charts
        )
        this.reactionUpdateSerial = reaction(
            () => appStorage.serialManager.availablePorts,
            (resources) => this.updateSerialStreams(resources)
        )
        this.reactionUpdateGenerators = reaction(
            () => appStorage.generatorsManager.generators,
            (resources) => this.updateGeneratorStreams(resources)
        )
    }

    updateGeneratorStreams(resources) {
        this.generatorStreams = resources.map((element) =>
            new DataStream({type: "generator", id: element.id, resource: element, charts: this.charts})
        )
    }

    updateSerialStreams(resources) {
        this.serialStreams = resources.map((element) =>
            new DataStream({type: "serial", id: element.id, resource: element, charts: this.charts})
        )
    }

    // async readStream(reader) {
    //     console.log(reader)
    //     let buffer = new Buffer()
    //     while (true) {
    //         let data = await reader.read()
    //         console.log(data)
    //         await new Promise(resolve => setTimeout(resolve, 10));
    //     }
    // }
}

export default DataStreamManager;