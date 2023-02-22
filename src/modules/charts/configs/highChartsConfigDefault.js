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
        useGPUTranslations: true,
        seriesThreshold: 2,
        turboThreshold: 5000,
        usePreallocated: false,
    },

    title: {text: 'Title'},
    // subtitle: {text: 'Using the Boost module'},
    tooltip: {
        valueDecimals: 2
    },
    plotOptions: {
        series: {
            animation: false
        },
        column: {
            boostThreshold: 256
        }
    },
    series: [{
        type: 'column',
        boostThreshold: 256
    }]
}