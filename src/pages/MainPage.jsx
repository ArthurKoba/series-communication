import React from 'react';

import ChartList from "../components/charts/ChartList";


const MainPage = () => {
    return (
        <div className="d-flex row container-fluid justify-content-center">
            <h1 className="text-center">Главная страница</h1>
            <div className="col-6">
                <ChartList></ChartList>
            </div>

        </div>
    );
};

export default MainPage;