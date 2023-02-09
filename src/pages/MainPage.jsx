import React from 'react';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import ChartList from "../components/charts/ChartList";


const MainPage = observer(() => {
    return (
        <Container fluid>
            <Container fluid className="d-flex row">
                <h1 className="text-center">Главная страница</h1>
                <ChartList></ChartList>
            </Container>
        </Container>
    );
});

export default MainPage;