export class SerialPortInteraction {
    #packetsConfig = {}
    #littleEndianReceive = true
    #byteOffsetReceive = 0

    setPacketConfig(config) {
        this.#packetsConfig = config
    }

    parsePacket(buffer) {
        console.log(buffer)
        let packet = {}
        packet.number = buffer[0]
        let sizeView = new DataView(new Uint8Array(buffer.slice(1, 3)).buffer)
        packet.length = sizeView.getUint16(this.#byteOffsetReceive, this.#littleEndianReceive)
        let dataView = new DataView(new Uint8Array(buffer.slice(3, buffer.length)).buffer)
        let packetConfig = this.#packetsConfig[packet.number]
        packet.data = []
        let dataType = packetConfig?.dataType || "uint8_t"
        for (let offset = 0; offset < packet.length;) {
            let dataValue = null
            switch (dataType) {
                case "float32_t":
                    dataValue = dataView.getFloat32(offset, this.#littleEndianReceive)
                    offset += 4
                    break
                case "uint8_t":
                default:
                    dataValue = dataView.getUint8(offset)
                    offset += 1
            }
            packet.data.push(dataValue)
        }
        console.log(packet.data)
        return packet
    }
}