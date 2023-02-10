

class SerialPortItemStorage {

    name = null

    constructor(portObject, index) {
        this.index = index
        this.portObject = portObject
        let info = portObject.getInfo()
        console.log(info)
        this.usbProductId = info?.usbProductId
        this.usbVendorId = info?.usbVendorId
    }
}

export default SerialPortItemStorage