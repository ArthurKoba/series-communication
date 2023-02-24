import './highcharts.scss'

export const defaultConfigHighCharts = {
    accessibility: {enabled: false},
    chart: {
        // styledMode: true,
        animation: false,
        reflow: false,
        showAxes: true,
        panKey: "shift",
        panning: {
            enabled: true,
            type: 'x'
        },
        zooming: {
            type: 'x',
        },
        type: 'column',
    },
    boost: {
        allowForce: true,
        enabled: true,
        pixelRatio: 1,
        seriesThreshold: 2,
        useGPUTranslations: true,
        usePreallocated: false,
    },
    title: {text: 'Chart'},
    // subtitle: {text: 'Using the Boost module'},
    tooltip: {
        valueDecimals: 2
    },
    plotOptions: {
        series: {
            animation: false
        },
        line: {
            boostThreshold: 2000
        },
        column: {
            boostThreshold: 256
        }
    },
    yAxis: {}
}