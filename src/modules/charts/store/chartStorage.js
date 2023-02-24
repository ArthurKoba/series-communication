import {action, makeAutoObservable} from "mobx";
import HighCharts from "highcharts"

import {defaultConfigHighCharts} from "../configs/highChartsConfigDefault"


class ChartStorage {
    chart = null
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
        this.chartConfig.yAxis.max = configs?.yAxisMax || undefined
        this.chartConfig.yAxis.min = configs?.yAxisMin || undefined
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
            name: this.chartConfig.title.text,
            type: this.chartConfig.chart.type,
            yAxisMin: this.chartConfig.yAxis.min,
            yAxisMax: this.chartConfig.yAxis.max
        }
    }

    setContainer(containerNode) {
        if (this.chart) return
        this.chart = new HighCharts.chart(containerNode, this.chartConfig)
        this.startTaskDestroyingInvisibleGraph().then(() => null)
    }

    async startTaskDestroyingInvisibleGraph() {
        while (this.chart) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            if (this.chart && !this.chart.container.isConnected) {
                this.chart = this.chart.destroy()
            }
        }
    }

    async updateData({dataName, data}) {
        if (dataName && !this.availableDataNames.includes(dataName))
            this.availableDataNames.push(dataName)
        if (this.isBusy || !this.chart) return
        if (this.selectedDataName && this.selectedDataName !== dataName) return
        this.isBusy = true
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

    updateFps = action((newFps) => this.fps = newFps)
}

export default ChartStorage