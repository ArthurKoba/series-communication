import {action, makeAutoObservable} from "mobx";
import HighCharts from "highcharts"

import {defaultConfigHighCharts} from "../configs/highChartsConfigDefault"


class ChartStorage {
    chart = null
    chartConfig = {...defaultConfigHighCharts, }

    availableDataNames = []
    fps = 0
    yAxisMax = undefined
    yAxisMin = undefined

    constructor({manager, configs}) {
        this.id = configs.id
        // this.data.type = configs?.type || "line"
        this.isFullScreen = configs?.isFullScreen || false
        this.isConfigurationOpened = configs?.isConfigurationOpened || false
        this.subscribeDataStreamType = configs?.subscribeDataStreamType || ""
        this.subscribeDataStreamId = configs?.subscribeDataStreamId || ""
        this.selectedDataName = configs?.selectedDataName || ""
        this.selectedDataName && this.availableDataNames.push(this.selectedDataName)
        this.manager = manager
        this.updateData = this.updateData.bind(this)
        makeAutoObservable(this)
    }

    setContainer(containerNode) {
        if (this.chart) this.chart.destroy()
        this.chart = new HighCharts.chart(containerNode, this.chartConfig)
    }

    updateFps = action((newFps) => this.fps = newFps)

    async updateData({dataName, data}) {
        if (dataName && !this.availableDataNames.includes(dataName))
            this.availableDataNames.push(dataName)
        if (this.isBusy || !this.chart) return
        if (this.selectedDataName && this.selectedDataName !== dataName) return
        this.isBusy = true
        let timer = new Date()
        this.chart.series[0].setData(data, true)
        // this.chart.series[1].setData(data, true)
        timer = new Date() - timer
        if (!this.fps) this.updateFps(Math.round(1000/timer))
        else this.updateFps(this.fps + Math.round((1000/timer - this.fps)/20))
        this.isBusy = false
    }

    click() {
        // this.chart.data.datasets[0].data = [1, 2, 3]
        this.chart.data.labels = ["1", "3", "2"]
        // this.chart?.update()
    }

    setType(type) {
        this.chartConfig.chart.type = type
        this.chart.update(this.chartConfig)
        this.manager.updateChartsConfigs(this.id)
    }

    swapFullscreen() {
        this.isFullScreen = !this.isFullScreen
        this.chart.update(this.chartConfig)
        this.manager.updateChartsConfigs(this.id)
    }

    swapConfigurationOpened () {
        this.isConfigurationOpened = !this.isConfigurationOpened
        this.manager.updateChartsConfigs(this.id)
    }

    setSubscribeDataStreamType(type) {
        this.subscribeDataStreamType = type
        this.subscribeDataStreamId = null
        this.availableDataNames = []
        this.selectedDataName = ""
        this.manager.updateChartsConfigs(this.id)
    }

    setSubscribeDataStreamId(id) {
        this.subscribeDataStreamId = id
        this.availableDataNames = []
        this.selectedDataName = ""
        this.manager.updateChartsConfigs(this.id)
    }

    setDataName(name) {
        this.selectedDataName = name
        this.manager.updateChartsConfigs(this.id)
    }

    getConfig() {
        return  {
            id: this.id, isFullScreen: this.isFullScreen, type: null,
            isConfigurationOpened: this.isConfigurationOpened, subscribeDataStreamType: this.subscribeDataStreamType,
            subscribeDataStreamId: this.subscribeDataStreamId, selectedDataName: this.selectedDataName
        }
    }

    resetScales() {
        this.setAxisScalesY({min: undefined, max: undefined})
    }

    setAxisScalesY({min, max}) {
        this.chart.yAxis[0].update(
            {min: this.yAxisMin = min, max: this.yAxisMax = max}
        )
    }

}

export default ChartStorage