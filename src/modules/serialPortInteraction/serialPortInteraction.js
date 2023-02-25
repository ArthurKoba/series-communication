import {PacketDataType} from "./packetDataType";


/**
 * Serial Port Interaction Packet.
 * @property {number} number
 * @property {string} name
 * @property {string} dataType
 * @property {number[]} data
 */
export class Packet {
    number = 0
    name = "0"
    dataType = PacketDataType.NONE_T
    data = []
}

/**
 * SerialPortInteraction parser.
 */
export class SerialPortInteraction {
    #packetsNames = {}
    #littleEndianReceive = true
    #byteOffsetReceive = 0

    // todo constructor

    /**
     * Installing package mappings.
     * The object key is an integer package number in the range 0-255, and the key value is its string name.
     * @param {{number: string} || {}} names
     */
    setPacketsNames(names) {
        this.#packetsNames = names
    }

    /**
     * Packet parsing function.
     * @param {Uint8Array} buffer
     * @returns {Packet || undefined}
     */
    parsePacket(buffer) {
        if (buffer.length < 4) return undefined
        let packet = new Packet()
        packet.number = buffer[0]
        packet.name = this.#packetsNames[packet.number] || packet.number.toString()
        let dataTypeId = buffer[1]
        packet.dataType = PacketDataType.getDataTypeName(dataTypeId)
        let dataLengthView = new DataView(buffer.slice(2, 4).buffer)
        packet.byteLength = dataLengthView.getUint16(this.#byteOffsetReceive, this.#littleEndianReceive)
        if (packet.byteLength !== buffer.length - 4) return undefined
        try {
            packet.data = this.#parseData(dataTypeId, new DataView(buffer.slice(4, buffer.length).buffer))
        } catch (e) {
            console.warn("Failed parse packet. Error message: ", e.message)
            return undefined
        }
        return packet
    }


    /**
     * Getting data according to their data type from DataView.
     * @private
     * @param {DataView} dataView
     * @param {number} dataTypeId
     * @returns {number[]}
     */
    #parseData(dataTypeId, dataView) {
        let data = []
        for (let offset = 0; offset < dataView.byteLength; offset += PacketDataType.getOffset(dataTypeId)) {
            switch (dataTypeId) {
                case PacketDataType.INT8_T:
                    data.push(dataView.getInt8(offset))
                    break
                case PacketDataType.INT16_T:
                    data.push(dataView.getInt16(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.UINT16_T:
                    data.push(dataView.getUint16(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.INT32_T:
                    data.push(dataView.getInt32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.UINT32_T:
                    data.push(dataView.getUint32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.FLOAT32_T:
                    data.push(dataView.getFloat32(offset, this.#littleEndianReceive))
                    break
                case PacketDataType.FLOAT64_T:
                    data.push(dataView.getFloat64(offset, this.#littleEndianReceive))
                    break
                default:
                    data.push(dataView.getUint8(offset))
            }
        }
        return data
    }
}