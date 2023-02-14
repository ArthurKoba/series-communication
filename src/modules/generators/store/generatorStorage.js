import {makeAutoObservable} from "mobx";

class Generator {

    isEnabled = false
    frequency = 0

    constructor(configs = {}) {
        this.id = configs.id
        this.manager = configs.manager
        this.frequency = configs?.frequency || 0.1
        this.isEnabled = configs?.isEnabled
        makeAutoObservable(this)
    }

    setFrequency(value) {
        this.frequency = value
        this.updateConfigs()
    }

    updateConfigs() {
        this.manager.updateGeneratorConfig({
            id: this.id, frequency: this.frequency, isEnabled: this.isEnabled
        })
    }

    remove() {
        this.manager.removeGenerator(this)
    }

    enable() {
        this.isEnabled = true
        this.updateConfigs()
    }

    disable() {
        this.isEnabled = false
        this.updateConfigs()
    }

}

export default Generator;