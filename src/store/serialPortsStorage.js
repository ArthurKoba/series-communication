import {makeAutoObservable} from "mobx";

class SerialPortStorage {
    availablePorts = []

    constructor() {
        makeAutoObservable(this)
        this.loadPorts = this.loadPorts.bind(this)
        navigator.serial.getPorts().then(this.loadPorts)
    }

    loadPorts(ports) {
        this.availablePorts = [...ports]
    }

    swapDarkMode() {
        this.darkMode = !this.darkMode;
    }

    async getPorts() {
        this.availablePorts = await navigator.serial.requestPort()
    }
}

export default new SerialPortStorage();