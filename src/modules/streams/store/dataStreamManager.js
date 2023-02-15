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
            (charts) => {
                this.charts = charts
            }
        )

        this.reactionUpdateSerial = reaction(
            () => appStorage.serialManager.availablePorts,
            (resources) => this.updateStreams(resources, "serial")
        )
        this.reactionUpdateGenerators = reaction(
            () => appStorage.generatorsManager.generators,
            (resources) => this.updateStreams(resources, "generator")
        )
    }

    updateStreams(resources, type) {
        this.generatorStreams = resources.map((element, index) =>
            new DataStream({type: type, id: index, resource: element, charts: this.charts})
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