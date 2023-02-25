import {action, makeAutoObservable} from "mobx";
import HighCharts from "highcharts"

import {defaultConfigHighCharts} from "../configs/highChartsConfigDefault"
import {StrategyFabric} from "../strategies";


class ChartStorage {
    chart = undefined
    chartConfig = {...defaultConfigHighCharts}
    availableDataNames = []
    fps = 0

    constructor({manager, configs}) {
        this.id = configs.id
        this.chartConfig.title.text = configs?.name || "Chart " + configs.id.toString()
        this.chartConfig.chart.type = configs?.type || "line"
        this.isFullScreen = configs?.isFullScreen || false
        this.isConfigurationOpened = configs?.isConfigurationOpened || false
        this.subscribeDataStreamType = configs?.subscribeDataStreamType || ""
        this.subscribeDataStreamId = configs?.subscribeDataStreamId || ""
        this.selectedDataName = configs?.selectedDataName || ""
        /**
         * @type {FftTransform || undefined}
         */
        this.strategy = StrategyFabric.getStrategyWithConfig(configs?.strategy)
        this.chartConfig.yAxis.max = configs?.yAxisMax ?? undefined
        this.chartConfig.yAxis.min = configs?.yAxisMin ?? undefined
        this.selectedDataName && this.availableDataNames.push(this.selectedDataName)
        this.manager = manager
        this.updateData = this.updateData.bind(this)
        makeAutoObservable(this)
    }

    getConfig() {
        return {
            id: this.id,
            isFullScreen: this.isFullScreen,
            isConfigurationOpened: this.isConfigurationOpened,
            subscribeDataStreamType: this.subscribeDataStreamType,
            subscribeDataStreamId: this.subscribeDataStreamId,
            selectedDataName: this.selectedDataName,
            strategy: StrategyFabric.getStrategyConfig(this.strategy),
            name: this.chartConfig.title.text,
            type: this.chartConfig.chart.type,
            yAxisMin: this.chartConfig.yAxis.min,
            yAxisMax: this.chartConfig.yAxis.max
        }
    }


    /**
     * The method is run after the component is mounted in the DOM tree in the useEffect function.
     * The code initializes the highcharts object of the chart in the container if the chart has not yet been created.
     * @param {HTMLElement} containerNode
     */
    setContainer(containerNode) {
        if (this.chart) return
        this.chart = new HighCharts.chart(containerNode, this.chartConfig, () => null)
        this.startTaskDestroyingInvisibleGraph().then(() => null)
    }

    /**
     * This function is necessary to eliminate the memory leak. The chart will continue to be drawn in the container
     * even if the chart component has been removed from the DOM tree. Since React does not provide a method to track
     * the removal of a component (maybe I'm wrong) from the DOM tree, the `HTMLElement.isConnected` method allows
     * to check if the object is connected to the DOM. If the condition is not met, the graph is destroyed and its
     *  container is permanently GC.
     */
    async startTaskDestroyingInvisibleGraph() {
        while (this.chart) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            if (this.chart && !this.chart.container.isConnected) {
                this.chart = this.chart.destroy()
            }
        }
    }

    /**
     * The Promise of drawing data on the graph. An object with a string type of data and an array of numbers is accepted.
     * If at the moment the data is `already drawn`, the `promise will stop performing` at the expense of `this.isBusy`.
     * This promise also `calculates the FPS` graphics.
     * @param {string} dataName
     * @param {number[]} data
     * @public
     * @returns {Promise<void>}
     */
    async updateData({dataName, data}) {
        if (dataName && !this.availableDataNames.includes(dataName))
            this.availableDataNames.push(dataName)
        if (this.isBusy || !this.chart) return
        if (this.selectedDataName && this.selectedDataName !== dataName) return
        this.isBusy = true
        if (this.strategy) data = this.strategy.convertData(data)
        let timer = new Date()
        if (this.chart.series.length) this.chart.series[0].setData(data, true)
        else this.chart.addSeries({data: data})
        timer = new Date() - timer
        if (!this.fps) this.updateFps(Math.round(1000 / timer))
        else this.updateFps(this.fps + Math.round((1000 / timer - this.fps) / 20))
        this.isBusy = false
    }

    saveConfigWrapperAndUpdateChart = (func) => {
        return (...args) => {
            func(...args)
            this.chart.update(this.chartConfig)
            this.manager.updateConfigs()
        }
    }

    resetScales = this.saveConfigWrapperAndUpdateChart(() => {
        this.chartConfig.yAxis.max = undefined
        this.chartConfig.yAxis.min = undefined
    })

    setMinAxisScaleY = this.saveConfigWrapperAndUpdateChart((value) =>
        this.chartConfig.yAxis.min = isNaN(value)? undefined: value
    )

    setMaxAxisScaleY = this.saveConfigWrapperAndUpdateChart((value) =>
        this.chartConfig.yAxis.max = isNaN(value)? undefined: value
    )

    setName = this.saveConfigWrapperAndUpdateChart((name) => this.chartConfig.title.text = name)
    setType = this.saveConfigWrapperAndUpdateChart((type) => this.chartConfig.chart.type = type)
    swapFullscreen = this.saveConfigWrapperAndUpdateChart(() => this.isFullScreen = !this.isFullScreen)

    saveConfigWrapper = (func) => {
        return (...args) => {
            func(...args)
            this.manager.updateConfigs()
        }
    }

    swapConfigurationOpened = this.saveConfigWrapper(() =>
        this.isConfigurationOpened = !this.isConfigurationOpened
    )

    setSubscribeDataStreamType = this.saveConfigWrapper((type) => {
        this.subscribeDataStreamType = type
        this.subscribeDataStreamId = null
        this.availableDataNames = []
        this.selectedDataName = ""
    })

    setSubscribeDataStreamId = this.saveConfigWrapper((id) => {
        this.subscribeDataStreamId = id
        this.availableDataNames = []
        this.selectedDataName = ""
    })

    setDataName = this.saveConfigWrapper((name) => this.selectedDataName = name)

    setStrategy = this.saveConfigWrapper((strategyType) => {
        this.strategy = StrategyFabric.getStrategyWithType(strategyType)
    })

    updateFps = action((newFps) => this.fps = newFps)
}

export default ChartStorage