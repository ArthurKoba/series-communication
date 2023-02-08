import React from "react";
import {Chart} from 'react-chartjs-2';
import {Container} from "react-bootstrap";


class ChartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "bar",
            name: "123",
            data: [1,2,3],
            labels: [],
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.updateData = this.updateData.bind(this)
        props.setChart(this)
    }

    increment() {
        this.setState({name: "etewt", type: "line"})
    }

    decrement() {
        this.updateData([1,2,3])
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
            <Container fluid className="p-0">
                <Chart type={this.state.type} options={options} data={data}></Chart>
                <Container fluid className="p-0 d-flex justify-content-center">
                    <button onClick={this.increment}>count+</button>
                    <button onClick={this.decrement}>count-</button>
                </Container>
            </Container>
        )
    }
}

export default ChartItem;