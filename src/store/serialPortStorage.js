import {makeAutoObservable} from "mobx";


class SerialPortItemStorage {

    isConnected = false
    isConnecting = false
    isBaudRateValid = false

    name = null
    baudRate = 0

    constructor(portObject) {
        this.portObject = portObject
        let info = portObject.getInfo()
        this.usbProductId = info?.usbProductId
        this.usbVendorId = info?.usbVendorId
        makeAutoObservable(this)
    }

    async connect() {
        if (this.isBaudRateValid === false) return
        this.isConnecting = true
        setTimeout(() => {
            this.isConnected = true
            this.isConnecting = false
        }, 1000)
        // this.isConnected = true
        // console.log(this.isConnected)
    }

    async disconnect() {
        this.isConnected = false
    }

    setName(newName) {
        this.name = newName.length? newName : ""
    }

    setBaudRate(baudRate) {
        console.log(baudRate)
        // this.name = newName
    }

    checkBaudRate = (value) => this.isBaudRateValid = Number.isInteger(value) && value > 1
}

export default SerialPortItemStorage