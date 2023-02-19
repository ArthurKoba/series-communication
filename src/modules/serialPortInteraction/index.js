import {SerialPortInteraction} from './serialPortInteraction'
import {PacketDataType} from './packetDataType'

const serialPortInteraction = new SerialPortInteraction()

serialPortInteraction.setPacketConfig({
    21: {dataName: "FFT FLOAT", dataType: "float32_t"},
    22: {dataName: "FFT BYTE", dataType: "uint8_t"},
})

export {
    SerialPortInteraction,
    serialPortInteraction,
    PacketDataType
}