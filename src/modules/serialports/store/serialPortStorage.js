import {action, makeAutoObservable} from "mobx";
import {SerialReader} from "../serialReader";


class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    constructor(portObject, configs) {
        this.id = configs.id
        this.manager = configs.manager
        this.name = configs?.name || "Serial " + configs.id
        this.isAutoOpen = configs?.isAutoOpen || false
        this.baudRate = configs?.baudRate || 115200
        this.usbProductId = configs?.usbProductId
        this.usbVendorId = configs?.usbVendorId
        this.port = portObject
        this.serialReader = new SerialReader({port: this.port})
        this.connect = this.connect.bind(this)
        this.disconnect = this.disconnect.bind(this)
        makeAutoObservable(this)
        if (this.isAutoOpen) this.connect().then(() => {})
    }

    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: this.id, isAutoOpen: this.isAutoOpen}
    }

    async connect() {
        if (this.isConnected || this.isConnecting) return
        this.setIsConnecting(true)
        try {
            await this.serialReader.openPort(this.baudRate)
            this.setIsConnected(true)
        } catch (error) {
            console.error(error)
            this.setIsConnected(false)
        }
        if (!this.isConnected) return
        this.serialReader.startReader().then(() => this.disconnect())
    }

    async disconnect() {
        if (!this.isConnected) return
        await this.serialReader.stopRequest()
        this.setIsConnected(false)
    }

    setHandler = (handler) => this.serialReader.setHandler(handler)

    saveConfigWrapper = (func) => {
        return (...args) => {
            func(...args)
            this.manager.updateConfigs()
        }
    }

    setAutoOpen    = this.saveConfigWrapper((isAutoOpen) => this.isAutoOpen = isAutoOpen)
    setName        = this.saveConfigWrapper((name) => this.name = name)
    setBaudRate    = this.saveConfigWrapper((baudRate) =>  this.baudRate = baudRate)

    setIsConnected = action((value) => {
        this.isConnected = !!value;
        this.isConnecting = false
    })

    setIsConnecting = action((value) => this.isConnecting = !!value)
}

export default SerialPortItemStorage