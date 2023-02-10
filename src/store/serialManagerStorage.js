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
        this.availablePorts = [ports.map((portObject, i) => new SerialPortStorage(portObject, i))]
        console.log(ports)
    }

    swapDarkMode() {
        this.darkMode = !this.darkMode;
    }

    async getPorts() {
        this.availablePorts = await navigator.serial.requestPort()
    }
}

export default new SerialManagerStorage();