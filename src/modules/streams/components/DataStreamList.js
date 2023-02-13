import React from 'react';
import {Container} from "react-bootstrap";

import DataStreamItem from "./DataStreamItem";
import {observer} from "mobx-react-lite";

const DataStreamList = observer(({serial}) => {
    return (
        <Container fluid>
            {
                serial.map((element, index) => <DataStreamItem key={index} stream={element}/>)
            }
        </Container>
    );
});

export default DataStreamList;