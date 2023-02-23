import {action, makeAutoObservable} from "mobx";
import {SerialReader} from "../serialReader";

export function checkBaudRate(value) {
    return Number.isInteger(value) && value > 0 && value < 10000000
}

class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    constructor(portObject, configs = {}) {
        this.id = configs.id
        this.manager = configs.manager
        this.name = configs?.name || configs?.id
        this.baudRate = configs?.baudRate || 0
        this.usbProductId = configs?.usbProductId
        this.usbVendorId = configs?.usbVendorId
        this.port = portObject
        this.serialReader = new SerialReader({port: this.port})
        this.connect = this.connect.bind(this)
        this.disconnect = this.disconnect.bind(this)
        makeAutoObservable(this)
        if (configs?.isConnected) this.connect().then(() => {})
    }

    setState = action((state) => {
        switch (state) {
            case "CONNECTING":
                this.isConnected = false
                this.isConnecting = true
                break
            case "CONNECTED":
                this.isConnected = true
                this.isConnecting = false
                break
            case "DISCONNECTED":
                this.isConnecting = false
                this.isConnected = false
                break
        }
        this.manager.updateConfigs()
    })

    setHandler = (handler) => this.serialReader.setHandler(handler)

    async connect() {
        if (this.isConnected || this.isConnecting) return
        this.setState("CONNECTING")
        try {
            await this.serialReader.openPort(this.baudRate)
            this.setState("CONNECTED")
        } catch (error) {
            console.error(error)
            this.setState("DISCONNECTED")
        }
        if (!this.isConnected) return
        this.serialReader.startReader().then(() => this.disconnect())
    }

    async disconnect() {
        if (!this.isConnected) return
        await this.serialReader.stopRequest()
        this.setState("DISCONNECTED")
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

    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: this.id, isConnected: this.isConnected}
    }
}

export default SerialPortItemStorage