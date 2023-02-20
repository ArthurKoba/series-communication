import {makeAutoObservable} from "mobx";

class Generator {

    isEnabled = false
    handler = null
    task = null

    constructor(configs = {}) {
        this.id = configs.id
        this.manager = configs.manager
        this.frequency = configs?.frequency || 0.1
        this.lengthData = configs?.lengthData || 10
        this.delayMs = configs?.delayMs || 10
        this.isEnabled = configs?.isEnabled
        if (this.isEnabled) this.enable()
        makeAutoObservable(this)
    }

    setFrequency(value) {
        this.frequency = value
        this.updateConfigs()
    }

    async startTask() {
        if (this.task !== null) return
        let index = 0
        while (this.isEnabled) {
            if (this.handler !== null) {
                let data = []
                let stopIndex = index + this.lengthData
                for (index; index < stopIndex && this.isEnabled; index++) {
                    data.push(Math.sin(this.frequency * index))
                }
                this.handler({dataName: null, data: data})
            }
            await new Promise(resolve => setTimeout(resolve, this.delayMs));
        }
        this.task = null
    }

    updateConfigs() {
        this.manager.updateGeneratorConfig({
            id: this.id, frequency: this.frequency, isEnabled: this.isEnabled,
            lengthData: this.lengthData, delayMs: this.delayMs
        })
    }

    remove() {
        this.manager.removeGenerator(this)
    }

    enable() {
        this.isEnabled = true
        this.task = this.startTask()
        this.updateConfigs()
    }

    disable() {
        this.isEnabled = false
        this.updateConfigs()
    }

    setLengthData(value) {
        this.lengthData = value
        this.updateConfigs()
    }

    setDelayMs(value) {
        this.delayMs = value
        this.updateConfigs()
    }

    setHandler = (handler) => this.handler = handler
}

export default Generator;