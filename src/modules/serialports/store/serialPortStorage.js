import {action, makeAutoObservable} from "mobx";

import {minBaudRate} from "../configs/popularBaudRates";
import {SerialReader} from "../serialReader";

/**
 * The object of the storage of the sequential port.
 * Performs storage functions, updates of configurations, connects and transfer handler
 * to the data obtaining SerialReader.
 *
 * @property {number} id
 * @property {string} name
 * @property {boolean} isAutoOpen
 * @property {number} baudRate
 * @property {number} usbProductId
 * @property {number} usbVendorId
 * @property {SerialPort} port
 * @property {SerialReader} serialReader
 * @property {SerialManagerStorage} manager
 *
 * @property {boolean} isConnected
 * @property {boolean} isConnecting
 */
class SerialPortItemStorage {

    isConnected = false
    isConnecting = false

    /**
     * The constructor accepts the `port object` and its `port storage configuration`.
     * @param {SerialPort} portObject
     * @param {object} configs
     */
    constructor(portObject, configs) {
        this.id = configs.id
        this.name = configs?.name || "Serial " + configs.id
        this.isAutoOpen = configs?.isAutoOpen || false
        this.baudRate = configs?.baudRate || minBaudRate
        this.usbProductId = configs?.usbProductId
        this.usbVendorId = configs?.usbVendorId
        this.port = portObject
        this.serialReader = new SerialReader(this.port)
        this.manager = configs.manager
        this.connect = this.connect.bind(this)
        this.disconnect = this.disconnect.bind(this)
        makeAutoObservable(this)
        if (this.isAutoOpen) this.connect().then(() => {})
    }

    /**
     * The function returns the configuration of the storage of the sequential port.
     * @public
     * @returns {{id: number, name: string, baudRate: number, isAutoOpen: boolean}}
     */
    getConfigs() {
        return {name: this.name, baudRate: this.baudRate, id: this.id, isAutoOpen: this.isAutoOpen}
    }

    /**
     * Asynchronous function of connecting to the sequential port, which changes the condition of the `isConnected`,
     * `isConnecting` properties. In case of successful connection, it launches an `SerialReader` of data reading.
     * @public
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.baudRate < minBaudRate || this.isConnected || this.isConnecting) return
        this._setIsConnecting(true)
        try {
            await this.serialReader.openPort(this.baudRate)
            this._setIsConnected(true)
        } catch (error) {
            console.error(error)
            this._setIsConnected(false)
        }
        if (!this.isConnected) return
        this.serialReader.startReader().then(() => this.disconnect())
    }

    /**
     * Asynchronous function of interruption of data reading and closing the serial port.
     * @public
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (!this.isConnected) return
        await this.serialReader.stopRequest()
        this._setIsConnected(false)
    }

    /**
     * Transfer of the function of installing a data on the data flow to `SerialReader`,
     * which will call the handler and transmit it received data.
     * @public
     * @param {function({dataName: string, data: number[]}): void} handler
     */
    setHandler = (handler) => this.serialReader.setHandler(handler)

    /**
     * The `decorator` of the function that, after calling it, will run the procedure
     * for maintaining configurations in the browser `localStorage`.
     * @param {function(any): any} func
     * @returns {function(any): any}
     * @protected
     */
    _saveConfigWrapper = (func) => {
        return (...args) => {
            const result = func(...args)
            this.manager.updateConfigs()
            return result
        }
    }

    /**
     * The installation function of the automatic connection value.
     * @public
     * @type {function(isAutoOpen: boolean): void}
     */
    setAutoOpen    = this._saveConfigWrapper((isAutoOpen) => this.isAutoOpen = isAutoOpen)

    /**
     * The function of setting the value of the user of the port name.
     * @public
     * @type {function(isAutoOpen: string): void}
     */
    setName        = this._saveConfigWrapper((name) => this.name = name)

    /**
     * The function of setting the value port baud rate speed.
     * @public
     * @type {function(isAutoOpen: number): void}
     */
    setBaudRate    = this._saveConfigWrapper((baudRate) =>  this.baudRate = baudRate)

    /**
     * The function that changes the state of the connection.
     * `true` is connected, `false` is disconnected.
     * @protected
     * @type {function(boolean): void}
     */
    _setIsConnected = action((value) => {
        this.isConnected = !!value;
        this.isConnecting = false
    })

    /**
     * The function that changes the state for connecting.
     * `true` is connecting, `false` is not connecting.
     * @protected
     * @type {function(boolean): void}
     */
    _setIsConnecting = action((value) => this.isConnecting = Boolean(value))
}

export default SerialPortItemStorage