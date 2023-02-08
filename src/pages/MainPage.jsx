import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import ChartList from "../components/charts/ChartList";

const MainPage = () => {
    const [counter, setCounter] = useState(1)
    const [data, setData] = useState([counter])
    const [labels, setLabels] = useState(["123"])
    const [charts, setChart] = useState([
        {name: "Chart1", labels: labels,  data: data}
    ])

    const updateData = () => {
        setCounter(counter + 1)
        setData([counter])
        setChart([{name: "Chart1", labels: labels,  data: data}])
    }


    return (
        <Container fluid>
            <h1 className="text-center">Главная страница</h1>
            <button onClick={updateData}>test</button>
            <ChartList charts={charts}></ChartList>
        </Container>
    );
};

export default MainPage;