import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import ChartList from "../components/charts/ChartList";

const MainPage = () => {
    const [charts, setChart] = useState([1])

    return (
        <Container fluid>
            <h1 className="text-center">Главная страница</h1>
            <ChartList charts={charts}></ChartList>
        </Container>
    );
};

export default MainPage;