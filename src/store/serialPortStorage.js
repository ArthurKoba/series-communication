

class SerialPortItemStorage {

    name = null
    isConnected = false

    constructor(portObject) {
        this.portObject = portObject
        let info = portObject.getInfo()
        this.usbProductId = info?.usbProductId || "null"
        this.usbVendorId = info?.usbVendorId || "null"
    }

    connect() {
        this.isConnected = true
    }

    disconnect() {
        this.isConnected = false
    }
}

export default SerialPortItemStorage