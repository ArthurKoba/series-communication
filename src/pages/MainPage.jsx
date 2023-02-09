import React from 'react';
import {Container} from "react-bootstrap";

import ChartList from "../components/charts/ChartList";


const MainPage = () => {
    return (
        <Container fluid className="d-flex row">
            <h1 className="text-center">Главная страница</h1>
            {/*<ChartList></ChartList>*/}
        </Container>
    );
};

export default MainPage;