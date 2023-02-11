import {makeAutoObservable} from "mobx";
import SerialPortStorage from "./serialPortStorage";

export function getPortId(portInfo) {
    return portInfo.usbVendorId && portInfo.usbProductId?
        portInfo.usbProductId.toString() + "-" + portInfo.usbVendorId.toString()
        : "virtual"
}

class SerialManagerStorage {
    availablePorts = []

    constructor() {
        makeAutoObservable(this)
        this.loadPorts = this.loadPorts.bind(this)
        this.loadPorts().then(()=> null)
    }

    async loadPorts() {
        let ports = await navigator.serial.getPorts()
        let virtualPorts = []
        let usbPorts = []
        ports.map((port) => Object.keys(port.getInfo()).length? usbPorts.push(port) : virtualPorts.push(port))
        while (virtualPorts.length > 1) virtualPorts.shift().forget()
        let configs = JSON.parse(localStorage.getItem("serialPorts"))
        ports = [...virtualPorts, ...usbPorts]
        this.availablePorts = []
        for (let port of ports) {
            let portInfo = port.getInfo()
            let config = configs.find((element) => element.id === getPortId(portInfo))
            config = config? {...config, ...portInfo} : {...portInfo}
            this.availablePorts.push(new SerialPortStorage(port, config))
        }
    }

    updateConfigs() {
        let currentConfigs = this.availablePorts.map((port) => port.getConfigs())
        let oldConfigs = JSON.parse(localStorage.getItem("serialPorts"))
        for (let config of oldConfigs) {
            if (currentConfigs.find((element) => element.id !== config.id))
                currentConfigs.push(config)
        }
        localStorage.setItem("serialPorts", JSON.stringify(currentConfigs))
    }
}

const serialManagerStorage = new SerialManagerStorage()

export default serialManagerStorage;