export const defaultOptions = {
    responsive: true,
    animation: {duration: 0},
    elements: {
        point: {radius: 0},
        line: {
            borderColor: "#F00",
            borderWidth: 1,
        }
    },
    plugins: {
        legend: {position: 'top'},
        title: {display: true, text: "Some chart"},
    },
    scales: {y: {}}
}