import React from "react";
import {Chart} from 'react-chartjs-2';
import {Button, Container} from "react-bootstrap";
import Select from "../UI/select/Select";


const changeTypeOptions = [
    {name: "Line", value: "line"}, {name: "Bar", value: "bar"}
]

class ChartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.chart?.type? props.chart.type: "bar",
            name: props.chart?.name? props.chart.name : "Some chart",
            data: props.chart?.data? props.chart.data: [],
            labels: props.chart?.labels? props.chart.labels : [],
            scales: {y: {min: null, max: null}}
        }
        this.resetScales = this.resetScales.bind(this)
        this.setData = this.setData.bind(this)
        this.updateData = this.updateData.bind(this)
        this.changeType = this.changeType.bind(this)
    }

    resetScales() {
        let min = 0
        let max = 1
        if (this.state.data.length) {
            min = this.state.data.reduce((x, y) => Math.min(x, y))
            max = this.state.data.reduce((x, y) => Math.max(x, y))
        }
        this.setState({scales: {y: {min: min, max: max}}})
    }

    setData() {
        this.updateData([1,2,3])
    }

    changeType(type) {
        this.setState({type: type})
    }

    updateData(data) {
        let newData = {data: data}
        if (this.state.labels.length !== data.length) {
            newData.labels = data.map((v, i) => i+1)
        }
        this.setState(newData)
    }

    render() {
        const options = {
            responsive: true,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: this.state.name,
                },
            },
            scales: this.state.scales,
        }

        const data = {
            labels: [...this.state.labels],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [...this.state.data],
                },
            ],
        }

        return (
            <Container fluid className="p-0 col-6">
                <Chart type={this.state.type} options={options} data={data}></Chart>
                <Container fluid className="p-0 d-flex  justify-content-center">
                    <Button onClick={this.resetScales}>Reset scales</Button>
                    <Button onClick={this.setData}>Set Data</Button>
                    <Select options={changeTypeOptions} onChange={this.changeType}></Select>
                </Container>
            </Container>
        )
    }
}

export default ChartItem;