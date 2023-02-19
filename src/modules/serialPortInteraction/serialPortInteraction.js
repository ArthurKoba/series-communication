import {PacketDataType} from "./packetDataType";


export class SerialPortInteraction {
    #packetsNames = {}
    #littleEndianReceive = true
    #byteOffsetReceive = 0

    setPacketsNames(names) {
        this.#packetsNames = names
    }

    parsePacket(buffer) {
        let packet = {}
        packet.number = buffer[0]
        packet.name = this.#packetsNames[packet.number] || packet.number.toString()
        let dataTypeId = buffer[1]
        packet.dataType = PacketDataType.getDataTypeName(dataTypeId)
        let sizeView = new DataView(new Uint8Array(buffer.slice(2, 4)).buffer)
        packet.byteLength = sizeView.getUint16(this.#byteOffsetReceive, this.#littleEndianReceive)
        let dataView = new DataView(new Uint8Array(buffer.slice(4, buffer.length)).buffer)
        packet.data = []
        for (let offset = 0; offset < packet.byteLength; offset += PacketDataType.getOffset(dataTypeId)) {
            switch (dataTypeId) {
                case PacketDataType.INT8_T:
                    packet.data.push(dataView.getInt8(offset))
                    break
                case PacketDataType.INT16_T:
                    packet.data.push(dataView.getInt16(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.UINT16_T:
                    packet.data.push(dataView.getUint16(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.INT32_T:
                    packet.data.push(dataView.getInt32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.UINT32_T:
                    packet.data.push(dataView.getUint32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.FLOAT32_T:
                    packet.data.push(dataView.getFloat32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.FLOAT64_T:
                    packet.data.push(dataView.getFloat64(offset, this.#littleEndianReceive))
                    break
                default:
                    packet.data.push(dataView.getUint8(offset))
            }
        }
        return packet
    }
}