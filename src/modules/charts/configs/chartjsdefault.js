export const chartTypes = [
    {type: "line", name: "Linear"},
    {type: "bar", name: "Bar"},
]

export const defaultOptions = {
    responsive: true,
    animation: {duration: 0},
    // parsing: false,
    elements: {
        point: {radius: 0},
        line: {
            tension: 0,
            borderColor: "#0A0",
            borderWidth: 1,

        }
    },
    plugins: {
        legend: {display: false, position: 'top'}, // datasets labels
        title: {display: false, text: "Some chart"}, // chart name
        tooltip: {enabled: true}, // point info when hover
    },
    scales: {
        x: {
            grid: {display: true}
        },
        y: {
            grid: {display: true}
        }
    }
}