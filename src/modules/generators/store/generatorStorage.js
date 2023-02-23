import {makeAutoObservable} from "mobx";

class Generator {

    handler = null
    task = undefined

    constructor(configs) {
        this.id = configs.id
        this.manager = configs.manager
        this.frequency = configs?.frequency || 0.1
        this.amplitude = configs?.amplitude || 1
        this.lengthData = configs?.lengthData || 10
        this.delayMs = configs?.delayMs || 10
        this.isEnabled = configs?.isEnabled || false
        if (this.isEnabled) this.enable()
        makeAutoObservable(this)
    }

    getConfig() {
        return {
            id: this.id, frequency: this.frequency, isEnabled: this.isEnabled,
            lengthData: this.lengthData, delayMs: this.delayMs, amplitude: this.amplitude
        }
    }

    async startTask() {
        this.isEnabled = true
        if (this.task) return
        let index = 0
        while (this.isEnabled) {
            if (!this.handler) continue
            let data = []
            let stopIndex = index + this.lengthData
            for (index; index < stopIndex && this.isEnabled; index++) {
                let value = Math.sin(this.frequency * index) * this.amplitude
                data.push(value)
            }
            this.handler({dataName: null, data: data})
            await new Promise(resolve => setTimeout(resolve, this.delayMs));
        }
        this.task = null
    }

    remove = () =>  this.manager.removeGenerator(this.id)
    setHandler = (handler) => this.handler = handler

    saveConfigWrapper = (func) => {
        return (...args) => {
            func(...args)
            this.manager.updateConfigs()
        }
    }

    enable = this.saveConfigWrapper(() => this.task = this.startTask())
    disable = this.saveConfigWrapper(() => this.isEnabled = false)
    setFrequency = this.saveConfigWrapper((value) => this.frequency = value)
    setAmplitude = this.saveConfigWrapper((value) => this.amplitude = value)
    setLengthData = this.saveConfigWrapper((value) => this.lengthData = value)
    setDelayMs = this.saveConfigWrapper((value) => this.delayMs = value)
}

export default Generator;