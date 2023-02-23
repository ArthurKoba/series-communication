import {makeAutoObservable} from "mobx";
import Generator from "./generatorStorage";

class GeneratorsManager {
    generators = []

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        let configs = localStorage.getItem("generators")
        if (!configs) return this.resetConfigs()
        this.generators = JSON.parse(configs).map((config, id) =>
            new Generator({...config, id: id, manager: this})
        )
    }

    createGenerator() {
        let newGenerator = new Generator({id: this.generators.length, manager: this})
        this.generators = [...this.generators, newGenerator]
        this.updateConfigs()
    }

    removeGenerator(generatorId) {
        this.generators = this.generators.filter((generator) => generator.id !== generatorId)
        this.updateConfigs()
    }

    updateConfigs() {
        localStorage.setItem("generators", JSON.stringify(
            this.generators.map((generator) => generator.getConfig())
        ))
    }

    resetConfigs() {
        this.generators = []
        localStorage.setItem("generators", "[]")
    }
}

export default GeneratorsManager;