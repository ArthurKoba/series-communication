import {makeAutoObservable} from "mobx";
import Generator from "./generatorStorage";
import {elements} from "chart.js";
import generators from "../pages/Generators";



class GeneratorsManager {

    generators = []

    constructor() {
        makeAutoObservable(this)
        let configs = JSON.parse(localStorage.getItem("generators"))
        if (configs) this.generators = configs.map((config) => new Generator(config))
        else localStorage.setItem("generators", JSON.stringify([]))
    }

    newGenerator() {
        this.generators.push(new Generator({id: this.getNewId()}))
    }

    updateConfigs() {
        let currentConfigs = this.generators.map((generator) => generator.getConfigs())
        let oldConfigs = JSON.parse(localStorage.getItem("generators"))
        for (let config of oldConfigs) {
            if (currentConfigs.find((element) => element.id !== config.id))
                currentConfigs.push(config)
        }
        localStorage.setItem("generators", JSON.stringify(currentConfigs))
    }

    getNewId() {
        while (true) {
            let id = Date.now() + this.generators.length
            if (!this.generators.find((element) => element.id !== id)) return id
        }
    }
}

export default new GeneratorsManager();