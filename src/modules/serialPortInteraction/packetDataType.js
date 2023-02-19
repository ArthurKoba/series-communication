export class PacketDataType {
    static NONE_T = 0
    static STRUCT_T = 1
    static INT8_T = 2
    static UINT8_T = 3
    static INT16_T = 4
    static UINT16_T = 5
    static INT32_T = 6
    static UINT32_T = 7
    static FLOAT32_T = 8
    static FLOAT64_T = 9

    static getDataTypeName(packetDataTypeId) {
        switch (packetDataTypeId) {
            case this.STRUCT_T: return "STRUCT_T"
            case this.INT8_T: return "INT8_T"
            case this.UINT8_T: return "UINT8_T"
            case this.INT16_T: return "INT16_T"
            case this.UINT16_T: return "UINT16_T"
            case this.INT32_T: return "INT32_T"
            case this.UINT32_T: return "UINT32_T"
            case this.FLOAT32_T: return "FLOAT32_T"
            case this.FLOAT64_T: return "FLOAT64_T"

            case this.NONE_T:
            default: return "NONE_T"
        }
    }

    static getOffset(packetDataTypeId) {
        switch (packetDataTypeId) {
            case this.INT16_T:
            case this.UINT16_T:
                return 2
            case this.INT32_T:
            case this.UINT32_T:
            case this.FLOAT32_T:
                return 4
            case this.FLOAT64_T:
                return 8
            case this.NONE_T:
            case this.STRUCT_T:
            case this.INT8_T:
            case this.UINT8_T:
            default:
                return 1
        }
    }
}