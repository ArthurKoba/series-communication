import {SerialPortInteraction} from './serialPortInteraction'
import {PacketDataType} from './packetDataType'
import {cobsDecoder, CobsDecoder} from "./cobsDecoder";

const serialPortInteraction = new SerialPortInteraction()

serialPortInteraction.setPacketsNames({
    21: "FFT FLOAT",
    22: "FFT BYTE",
})

export {
    CobsDecoder,
    PacketDataType,
    SerialPortInteraction,
    cobsDecoder,
    serialPortInteraction,
}