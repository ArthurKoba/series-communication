import {makeAutoObservable} from "mobx";
import Chart from "chart.js/auto";

import {defaultOptions} from "../configs/chartjsdefault"

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }
    ]
}

class ChartStorage {
    chart = null
    data = {type: "line", options: {...defaultOptions}, data: {...data}}

    availableDataNames = []
    fps = 0

    constructor({manager, configs}) {
        this.id = configs.id
        this.data.type = configs?.type || "line"
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

    setCtx(ctx) {
        if (Chart.getChart(ctx)) return
        this.chart = new Chart(ctx, this.data)
    }

    async updateData({dataName, data}) {
        if (dataName && !this.availableDataNames.includes(dataName))
            this.availableDataNames.push(dataName)
        if (this.isBusy || this.selectedDataName && this.selectedDataName !== dataName) return
        this.isBusy = true
        if (this.data.data.labels.length !== data.length) {
            this.data.data.labels = [...Array(data.length).keys()].map(i => i+1)
        }
        this.data.data.datasets[0].data = data
        let timer = new Date()
        this.chart?.update()
        timer = new Date() - timer
        if (!this.fps) this.fps = Math.round(1000/timer)
        else this.fps += Math.round((1000/timer - this.fps)/20)
        this.isBusy = false
    }

    click() {
        this.chart.data.datasets[0].data = [1, 2, 3]
        this.chart.data.labels = ["1", "3", "2"]
        this.chart?.update()
    }

    setType(type) {
        this.data.type = type
        this.chart?.update()
        this.updateConfigs()
    }

    swapFullscreen() {
        this.isFullScreen = !this.isFullScreen
        this.updateConfigs()
    }

    swapConfigurationOpened () {
        this.isConfigurationOpened = !this.isConfigurationOpened
        this.updateConfigs()
    }

    setSubscribeDataStreamType(type) {
        this.subscribeDataStreamType = type
        this.subscribeDataStreamId = null
        this.availableDataNames = []
        this.selectedDataName = ""
        this.updateConfigs()
    }

    setSubscribeDataStreamId(id) {
        this.subscribeDataStreamId = id
        this.availableDataNames = []
        this.selectedDataName = ""
        this.updateConfigs()
    }

    setDataName(name) {
        this.selectedDataName = name
        this.updateConfigs()
    }

    updateConfigs() {
        const config = {
            id: this.id, fullscreen: this.isFullScreen, type: this.data.type,
            isConfigurationOpened: this.isConfigurationOpened, subscribeDataStreamType: this.subscribeDataStreamType,
            subscribeDataStreamId: this.subscribeDataStreamId, selectedDataName: this.selectedDataName
        }
        this.manager.updateChartConfig(config)
    }

    resetScales() {
        let min = Math.min(...this.chart.data.datasets.map((dataset) => Math.min(...dataset.data)))
        let max = Math.max(...this.chart.data.datasets.map((dataset) => Math.max(...dataset.data)))
        this.setScales({min: min, max: max})
    }

    setMaxScale(value) {
        this.data.options.scales.y.max = value
        this.chart?.update()
    }

    setMinScale(value) {
        this.data.options.scales.y.min = value
        this.chart?.update()
    }

    setScales({min, max}) {
        this.data.options.scales.y = {min: min, max: max}
        this.chart?.update()
    }

    remove = () => this.manager.deleteChart(this)
}

export default ChartStorage