import {cobsDecoder} from "../cobs/decoder";
import {serialPortInteraction} from "../serialPortInteraction";


/**
 * public
 * @property {SerialPort} port
 */
export class SerialReader {

    /**
     * @private
     * @type {function({dataName: string, data: number[]}) || undefined}
     */
    #_handler = undefined

    constructor(port) {
        this.port = port
    }

    /**
     * @public
     * @param {function({dataName: string, data: number[]}) || undefined} handler
     */
    setHandler = (handler) => this.#_handler = handler


    /**
     * @public
     * @param {number} baudRate
     * @returns {Promise<void>}
     */
    async openPort(baudRate) {
        await this.port.open({
            baudRate: baudRate,
            dataBits: 8,
            stopBits: 1,
            parity: "none",
            bufferSize: 4096*4,
            flowControl: "none",
        })
    }

    /**
     * @public
     * @returns {Promise<void>}
     */
    async startReader() {
        try {
            /**
             * @type {Promise<void> || undefined}
             * @private
             */
            this._readerTask = this._read()
            await this._readerTask
        } catch (e) {
            console.error(e)
        }
        await this.stopRequest()
    }

    /**
     * @public
     * @returns {Promise<void>}
     */
    async stopRequest() {
        if (!this.port.readable || this._isBusyClosing) return
        /**
         * @type {boolean}
         * @private
         */
        this._isBusyClosing = true
        if (this._readerTask) {
            this._needStop = true
            if (this.port.readable.locked) this.reader = await this.reader.cancel()
            await this._readerTask
        }
        if (this.port.readable) {
            while (this.port.readable.locked) {
                await new Promise((resolve) => setTimeout(resolve, 10))
            }
            this.port.close()
        }
        this._isBusyClosing = false
    }


    /**
     * @param {number[]} buffer
     * @private
     */
    _dataHandler(buffer) {

        /**
         * @type {number[]}
         */
        let cobsData = cobsDecoder.decode(buffer);
        if (cobsData.length && this.#_handler) {
            let packet
            try {
                packet = serialPortInteraction.parsePacket(cobsData)
            } catch (e) {
                console.warn("packet parse failed")
            }
            if (packet) this.#_handler({dataName: packet.name, data: packet.data})
        } else {
            // todo fix types
            const byteBuffer = new Uint8Array(buffer, 0, buffer.length)
            const string = new TextDecoder().decode(byteBuffer)
            console.log(string)
        }
    }

    /**
     * Data reading function. It is launched only with an open port and the `negative parameter of this.needStop`.
     * Stop is carried out using the `needStop` variable.
     * Interruption of reading (more precisely endless data expectation) occurs by canceling the this.reader.
     * @returns {Promise<void>}
     * @private
     */
    async _read() {
        let buffer = []
        this._needStop = null
        while (this._needStop !== true && this.port.readable) {
            if (!this.port.readable.locked) this.reader = this.port.readable.getReader()
            let result
            try {
                // todo Transform Stream
                result = await this.reader.read()
            } catch (e) {
                if (e.message.includes("The device has been lost")) {
                    return this.port.close()
                }
                console.warn("Serial Reader: ", e.message)
            }
            if (!result || !result.value) continue
            for (let byte of result.value) {
                buffer.push(byte)
                if (byte === cobsDecoder.getDelimiter() || buffer.length > 65536 + 5) {
                    this._dataHandler(buffer)
                    buffer = []
                }
            }
        }
        if (this.port.readable?.locked) this.reader = await this.reader.cancel()
    }
}