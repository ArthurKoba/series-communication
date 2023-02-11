import {makeAutoObservable} from "mobx";
import serialManagerStorage, {getPortId} from "./serialManagerStorage";

export function checkBaudRate(value) {
    return Number.isInteger(value) && value > 0 && value < 10000000
}

class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    name = null
    baudRate = 0

    constructor(portObject, configs = {}) {
        this.portObject = portObject
        this.id = configs?.id
        this.name = configs?.name || configs?.id
        this.baudRate = configs?.baudRate || 0
        this.usbProductId = configs?.usbProductId
        this.usbVendorId = configs?.usbVendorId
        makeAutoObservable(this)
    }

    connect() {
        this.isConnecting = true
        setTimeout(() => {
            this.isConnected = true
            this.isConnecting = false
        }, 1000)
    }

    async disconnect() {
        this.isConnected = false
    }

    setName(newName) {
        if (!newName.length) return
        this.name = newName
        serialManagerStorage.updateConfigs()
    }

    setBaudRate(baudRate) {
        if (!checkBaudRate(baudRate)) return
        this.baudRate = baudRate
        serialManagerStorage.updateConfigs()
    }

    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: getPortId(this)}
    }
}

export default SerialPortItemStorage