import {SerialPortInteraction} from './serialPortInteraction'
import {PacketDataType} from './packetDataType'

const serialPortInteraction = new SerialPortInteraction()

serialPortInteraction.setPacketsNames({
    21: "FFT FLOAT",
    22: "FFT BYTE",
})

export {
    SerialPortInteraction,
    serialPortInteraction,
    PacketDataType
}