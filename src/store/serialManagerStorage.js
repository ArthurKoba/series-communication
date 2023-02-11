import {makeAutoObservable} from "mobx";
import SerialPortStorage from "./serialPortStorage";

class SerialManagerStorage {
    availablePorts = []

    constructor() {
        makeAutoObservable(this)
        this.loadPorts = this.loadPorts.bind(this)
        navigator.serial.getPorts().then(this.loadPorts)
    }

    loadPorts(ports) {
        this.availablePorts = ports.map((portObject) => new SerialPortStorage(portObject))
    }

    async getPorts() {
        this.availablePorts = await navigator.serial.requestPort()
    }
}

export default new SerialManagerStorage();