import {reaction} from "mobx";


class DataStreamManager {
    serialStreams = []

    constructor() {
    }

    init(appStorage) {
        reaction(
            () => appStorage.serialManager.availablePorts,
            (change) => this.updateSerialPorts(change)
        )
    }

    updateSerialPorts(serialPorts) {
        this.serialStreams = [...serialPorts]
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