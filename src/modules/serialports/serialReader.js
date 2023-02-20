import {cobsDecoder} from "../cobs/decoder";
import {serialPortInteraction} from "../serialPortInteraction";

export class SerialReader {
    constructor({port}) {
        this.port = port
        this.isPortOpened = false
        this.handler = null
    }

    setHandler = (handler) => this.handler = handler

    async openPort(baudRate) {
        await this.port.open({
            baudRate: baudRate,
            // dataBits: 8,
            // stopBits: 1,
            // parity: "none",
            // bufferSize: 4096,
            // flowControl: "none",
        })
        this.isPortOpened = true
    }

    async stopRequest() {
        if (!this.isPortOpened) return
        if (this.readerTask) {
            this.needStop = true
            await this.readerTask
            this.readerTask = null
        }

        if (this.isPortOpened) {
            this.isPortOpened = false
            this.port.close()
        }
    }

    async startReader() {
        try {
            this.readerTask = this.read()
            await this.readerTask
        } catch (e) {
            console.error(e)
            await this.stopRequest()
        }
    }

    dataHandler(buffer) {
        let cobsData = cobsDecoder.decode(buffer);
        if (cobsData.length) {
            try {
                let packet = serialPortInteraction.parsePacket(cobsData)
                if (this.handler) this.handler({dataName: packet.name, data: packet.data})
            } catch (e) {
                console.warn("packet parse failed")
            }
        } else {
            // console.log("No cobs data")
            const byteBuffer = new Uint8Array(buffer, 0, buffer.length)
            const string = new TextDecoder().decode(byteBuffer)
            console.log(string)
        }
    }


    async read() {
        this.buffer = []
        let reader = this.port.readable.getReader();
        let buffer = []
        while (this.needStop !== true && this.port.readable) {
            if (reader === null) reader = this.port.readable.getReader()
            if (buffer.length > 65536 + 5) {
                this.dataHandler(buffer)
                buffer = []
            }
            try {
                let {value} = await reader.read()
                for (let byte of value) {
                    buffer.push(byte)
                    if (byte === cobsDecoder.getDelimiter()) {
                        this.dataHandler(buffer)
                        buffer = []
                    }
                }
            } catch (e) {
                console.warn("Serial Reader: ", e.message)
                reader = null
            }
        }
        if (reader !== null) await reader.cancel()
        this.needStop = null
    }
}