import {makeAutoObservable} from "mobx";


class SerialPortItemStorage {

    isConnected = false
    name = null

    constructor(portObject) {
        this.portObject = portObject
        let info = portObject.getInfo()
        this.usbProductId = info?.usbProductId
        this.usbVendorId = info?.usbVendorId
        makeAutoObservable(this)
    }

    async connect() {
        this.isConnected = true
    }

    async disconnect() {
        this.isConnected = false
    }

    setName(newName) {
        this.name = newName
    }
}

export default SerialPortItemStorage