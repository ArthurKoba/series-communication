import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ChartItem from "../components/charts/ChartItem";

const MainPage = () => {
    const [counter, setCounter] = useState(1)
    const [labels, setLabels] = useState(["123"])

    const [chart, setChart] = useState({name: "chart", data: [], type: "line"})



    useEffect(() => {
        // console.log(counter)
    }, [chart])

    function updateData () {
        setCounter(counter + 1)
        setChart({...chart, data: [counter]})

    }

    return (
        <Container fluid>
            <Container fluid className="d-flex row">
                <h1 className="text-center">Главная страница</h1>

                {/*<ChartList charts={charts}></ChartList>*/}
                <ChartItem chart={chart} counter={counter}></ChartItem>
                <Button onClick={updateData} className="col-6 ml-auto">test</Button>
            </Container>
        </Container>
    );
};

export default MainPage;