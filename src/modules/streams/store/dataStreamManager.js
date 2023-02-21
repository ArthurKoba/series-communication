import {makeAutoObservable, reaction} from "mobx";

import DataStream from "./dataStreamStorage";
import {streamTypes} from "../streamTypes";


class DataStreamManager {
    serialStreams = []
    generatorStreams = []

    constructor() {
        makeAutoObservable(this)
    }

    init(appStorage) {
        this.reactionUpdateSerial = reaction(
            () => appStorage.serialManager.availablePorts,
            (resources) => this.updateSerialStreams(resources, appStorage)
        )
        this.reactionUpdateGenerators = reaction(
            () => appStorage.generatorsManager.generators,
            (resources) => this.updateGeneratorStreams(resources, appStorage)
        )
    }

    updateGeneratorStreams(resources, appStorage) {
        this.generatorStreams = resources.map((resource) =>
            new DataStream({type: streamTypes.generator, resource, appStorage})
        )
    }

    updateSerialStreams(resources, appStorage) {
        this.serialStreams = resources.map((resource) =>
            new DataStream({type: streamTypes.serial, resource, appStorage})
        )
    }
}

export default DataStreamManager;