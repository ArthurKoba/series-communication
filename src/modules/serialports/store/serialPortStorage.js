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

    onConnect(error) {

        this.isConnected = true
        this.isConnecting = false
        this.manager.updateConfigs()
        if (!error || !this.readerTask)
            this.readerTask = this.dataReader()

    }

    connect() {
        this.isConnecting = true
        this.portObject.open({baudRate: this.baudRate}).then(this.onConnect).catch((e) => this.onConnect(e))
    }

    disconnect() {
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
        this.handler = handler
    }

    async dataHandler(buffer) {
        const byteBuffer = new Uint8Array(buffer, 0, buffer.length)
        const string = new TextDecoder().decode(byteBuffer)
        console.log(string)
    }

    async dataReader() {
        this.reader = this.portObject.readable.getReader()
        let buffer = []
        while (this.isConnected) {
            let data = await this.reader.read()
            for (let byte of data.value) {
                buffer.push(byte)
                if (byte === 10) {
                    await this.dataHandler(buffer)
                    buffer = []
                }
            }
        }
        await this.reader.cancel()
        this.portObject.close()
        this.readerTask = null
    }


    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: this.id, isConnected: this.isConnected}
    }
}

export default SerialPortItemStorage