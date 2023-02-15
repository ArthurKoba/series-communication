import {makeAutoObservable} from "mobx";
import Generator from "./generatorStorage";

class GeneratorsManager {
    generators = []

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        let configs = JSON.parse(localStorage.getItem("generators"))
        if (!configs) return
        configs = configs.filter((element) => element !== null)
        if (configs) this.generators = configs.map((
            config, index) => new Generator({...config, id: index, manager: this})
        )
    }

    newGenerator() {
        this.generators = [...this.generators, new Generator({id: this.generators.length, manager: this})]
    }

    removeGenerator(generator) {
        this.generators = this.generators.filter((chart) => chart.id !== chart)
        let configs = JSON.parse(localStorage.getItem("generators"))
        delete configs[generator.id]
        this.generators = this.generators.filter((element) => element.id !== generator.id)
        localStorage.setItem("generators", JSON.stringify(configs))
    }

    updateGeneratorConfig(config) {
        let configs = JSON.parse(localStorage.getItem("generators"))
        if (!configs) configs = [config]
        else configs[config.id] = config
        localStorage.setItem("generators", JSON.stringify(configs))
    }

}

export default GeneratorsManager;