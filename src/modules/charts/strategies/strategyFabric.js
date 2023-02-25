import {strategies} from "./index";

export class StrategyFabric {
    /**
     * @param {FftTransform || undefined} config
     // * @returns {undefined}
     */
    static getStrategyWithConfig(config) {
        if (!config) return undefined
        /**
         * @type {function || FftTransform}
         */
        const strategyClass = strategies.find((strategy) => strategy.type === config.type)
        return strategyClass? new strategyClass(config) : undefined
    }

    /**
     *
     * @param {string || undefined} strategyType
     */
    static getStrategyWithType(strategyType) {
        /**
         * @type {function || FftTransform}
         */
        const strategyClass = strategies.find((strategy) => strategy.type === strategyType)
        return strategyClass? new strategyClass() : undefined
    }

    /**
     * @param {FftTransform || undefined} strategy
     * @returns {undefined}
     */
    static getStrategyConfig(strategy) {
        if (!strategy) return undefined
        return strategy.getConfig()
    }
}