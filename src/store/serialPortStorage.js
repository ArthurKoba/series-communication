import {makeAutoObservable} from "mobx";
import serialManagerStorage, {getPortId} from "./serialManagerStorage";
import dataStreamManager from "./dataStreamManager";

export function checkBaudRate(value) {
    return Number.isInteger(value) && value > 0 && value < 10000000
}

class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    name = null
    baudRate = 0

    constructor(portObject, configs = {}) {
        this.id = configs?.id
        this.name = configs?.name || configs?.id
        this.baudRate = configs?.baudRate || 0
        this.usbProductId = configs?.usbProductId
        this.usbVendorId = configs?.usbVendorId
        this.portObject = portObject
        this.onConnect = this.onConnect.bind(this)
        makeAutoObservable(this)
        if (configs?.isConnected) this.connect()
    }

    onConnect() {
        this.isConnected = true
        this.isConnecting = false
        dataStreamManager.addStream({type: "serial", resourceObject: this})
        serialManagerStorage.updateConfigs()
    }

    connect() {
        this.isConnecting = true
        this.portObject.open({baudRate: this.baudRate}).then(this.onConnect).catch(() => this.onConnect())
    }

    disconnect() {
        dataStreamManager.deleteStream({type: "serial", resourceObject: this})
        this.portObject.close()
        this.isConnected = false
        serialManagerStorage.updateConfigs()
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
        return {name: this.name, baudRate: this.baudRate, id: getPortId(this), isConnected: this.isConnected}
    }
}

export default SerialPortItemStorage