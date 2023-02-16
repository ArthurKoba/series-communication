import {makeAutoObservable} from "mobx";

export function checkBaudRate(value) {
    return Number.isInteger(value) && value > 0 && value < 10000000
}

class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    name = null
    baudRate = 0

    constructor(portObject, configs = {}) {
        this.id = configs.id
        this.manager = configs.manager
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
        this.manager.updateConfigs()
    }

    connect() {
        this.isConnecting = true
        this.portObject.open({baudRate: this.baudRate}).then(this.onConnect).catch(() => this.onConnect())
    }

    disconnect() {
        this.portObject.close()
        this.isConnected = false
        this.manager.updateConfigs()
    }

    setName(newName) {
        if (!newName.length) return
        this.name = newName
        this.manager.updateConfigs()
    }

    setBaudRate(baudRate) {
        if (!checkBaudRate(baudRate)) return
        this.baudRate = baudRate
        this.manager.updateConfigs()
    }

    setHandler(handler) {

    }

    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: this.id, isConnected: this.isConnected}
    }
}

export default SerialPortItemStorage