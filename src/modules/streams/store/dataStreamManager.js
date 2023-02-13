import {makeAutoObservable} from "mobx";

class DataStreamManager {

    // serialReaders = []

    constructor() {
        // makeAutoObservable(this)
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

    addStream({type, resourceObject}) {
        // let reader = resourceObject.portObject.readable.getReader()
        // this.readStream(reader).then(() => null)
    }

    deleteStream({type, resourceObject}) {

    }
}

export default DataStreamManager;