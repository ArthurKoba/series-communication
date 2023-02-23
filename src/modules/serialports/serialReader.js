import {cobsDecoder} from "../cobs/decoder";
import {serialPortInteraction} from "../serialPortInteraction";


export class SerialReader {
    constructor({port}) {
        this.port = port
        this.isPortOpened = false
        this.handler = undefined
    }

    setHandler = (handler) => this.handler = handler

    async openPort(baudRate) {
        await this.port.open({
            baudRate: baudRate,
            dataBits: 8,
            stopBits: 1,
            parity: "none",
            bufferSize: 4096*4,
            flowControl: "none",
        })
        this.isPortOpened = true
    }

    async stopRequest() {
        if (!this.isPortOpened || this.isBusyClosing) return
        this.isBusyClosing = true
        if (this.readerTask) {
            this.needStop = true
            if (this.reader) this.reader = await this.reader.cancel()
            await this.readerTask
        }
        if (this.isPortOpened) {
            while (this.port.readable?.locked) {
                await new Promise((resolve) => setTimeout(resolve, 10))
            }
            this.port.close()
            this.isPortOpened = false
        }
        this.isBusyClosing = false
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
        if (cobsData.length && this.handler) {
            let packet
            try {
                packet = serialPortInteraction.parsePacket(cobsData)
            } catch (e) {
                console.warn("packet parse failed")
            }
            if (packet) this.handler({dataName: packet.name, data: packet.data})
        } else {
            const byteBuffer = new Uint8Array(buffer, 0, buffer.length)
            const string = new TextDecoder().decode(byteBuffer)
            console.log(string)
        }
    }

    async read() {
        let buffer = []
        this.needStop = null
        while (this.needStop !== true && this.port.readable) {
            if (!this.reader) this.reader = this.port.readable.getReader()
            let result
            try {
                result = await this.reader.read()
            } catch (e) {
                console.warn("Serial Reader: ", e.message)
                this.reader = undefined
            }
            if (!result || !result.value) continue
            for (let byte of result.value) {
                buffer.push(byte)
                if (byte === cobsDecoder.getDelimiter() || buffer.length > 65536 + 5) {
                    this.dataHandler(buffer)
                    buffer = []
                }
            }
        }
        if (this.reader) this.reader = await this.reader.cancel()
    }
}