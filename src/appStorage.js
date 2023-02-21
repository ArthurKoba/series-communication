import chartManagerStorage from "./modules/charts/store/chartManagerStorage";
import serialManagerStorage from "./modules/serialports/store/serialManagerStorage";
import generatorManagerStorage from "./modules/generators/store/generatorManagerStorage";
import dataStreamManager from "./modules/streams/store/dataStreamManager";


class AppStorage {
    chartsManager = new chartManagerStorage()
    serialManager = new serialManagerStorage()
    generatorsManager = new generatorManagerStorage()
    streamsManager = new dataStreamManager()

    constructor() {
        this.streamsManager.init(this)
        this.generatorsManager.init()
        this.chartsManager.init()
    }
}

export default new AppStorage();