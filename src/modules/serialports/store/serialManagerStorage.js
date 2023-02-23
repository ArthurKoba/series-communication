import {action, makeAutoObservable} from "mobx";

import SerialPortStorage from "./serialPortStorage";
import {alertWarningVirtualSerialPort} from "../../../shared/utils";


export default class SerialManagerStorage {
    availablePorts = []

    constructor() {
        makeAutoObservable(this)
        if (!navigator.serial) return
        this.loadPorts = this.loadPorts.bind(this)
        this.loadPorts().then(()=> null)
        navigator.serial.onconnect = this.loadPorts
        navigator.serial.ondisconnect = this.loadPorts
    }

    setAvailablePorts = action((ports) => this.availablePorts = ports)

    async addSerialPort() {
        let port = navigator.serial.requestPort()
        try {
            port = await port
        } catch (e) {
            return
        }

        if (Object.keys(port.getInfo())) {
            let alreadyAvailableVirtualPortsStorages = this.availablePorts.filter(
                (availablePortStorage) => availablePortStorage.id === "virtual"
            )
            for (let availablePortStorage of alreadyAvailableVirtualPortsStorages) {
                availablePortStorage.port.forget()
            }
            if (alreadyAvailableVirtualPortsStorages) alertWarningVirtualSerialPort()
        }
        this.loadPorts().then(() => null)
    }

    async loadPorts() {
        let virtualPorts = []
        let usbPorts = []
        for (let port of await navigator.serial.getPorts()) {
            if (Object.keys(port.getInfo()).length) usbPorts.push(port)
            else virtualPorts.push(port)
        }
        if (virtualPorts.length > 1) {
            while (virtualPorts.length) virtualPorts.shift().forget()
            alertWarningVirtualSerialPort()
        }
        let configs = JSON.parse(localStorage.getItem("serialPorts"))
        let availablePortsStorage = []
        for (let port of [...virtualPorts, ...usbPorts]) {
            const portInfo = port.getInfo()
            const portId = getPortId(portInfo)
            let config = configs.find((element) => element.id === portId)
            if (config) config = {...config, ...portInfo, id: portId, manager: this}
            else config = {...portInfo, id: portId, manager: this}
            availablePortsStorage.push(new SerialPortStorage(port, config))
        }
        this.setAvailablePorts(availablePortsStorage)
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

function getPortId(portInfo) {
    if (!portInfo.usbVendorId && !portInfo.usbProductId) return "virtual"
    return portInfo.usbProductId?.toString(16) + "-" + portInfo.usbVendorId?.toString(16)
}