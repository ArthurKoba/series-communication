import {makeAutoObservable} from "mobx";
import generatorManagerStorage from "./generatorManagerStorage";

class Generator {

    isEnabled = false
    name = null
    frequency = 0

    constructor(configs = {}) {
        this.id = configs.id
        this.name = configs?.name || configs.id
        this.frequency = configs?.frequency || 0.1
        makeAutoObservable(this)
    }

    setName(newName) {
        if (!newName.length) return
        this.name = newName
        generatorManagerStorage.updateConfigs()
    }

    setFrequency(value) {
        console.log(value)
    }

    getConfigs() {
        return {
            id: this.id,
            name: this.name,
            frequency: this.frequency
        }
    }

    enable() {
        this.isEnabled = true
    }

    disable() {
        this.isEnabled = false
    }

}

export default Generator;