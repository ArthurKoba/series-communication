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
        seriesThreshold: 5
    },

    title: {text: 'Title'},
    // subtitle: {text: 'Using the Boost module'},
    tooltip: {
        valueDecimals: 2
    },
    plotOptions: {
        series: {
            animation: false
        }
    },
    series: [
        {
            data: [1,2,3],
            lineWidth: 1
        },
    ]

}