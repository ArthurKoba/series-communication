export const defaultConfigHighCharts = {
    accessibility: {enabled: false},
    chart: {
        animation: false,
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        type: 'column',
    },
    boost: {
        allowForce: true,
        turboThreshold: 5000,
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