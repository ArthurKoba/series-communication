import React from 'react';
import {Container} from "react-bootstrap";

import DataStreamItem from "./DataStreamItem";
import {observer} from "mobx-react-lite";

const DataStreamList = observer(({name, resource}) => {
    return (
        <Container fluid className="row text-center">
            {resource.length? <h2 className="mt-2">{name}</h2> : ""}
            {
                resource.map((element, index) => <DataStreamItem key={index} stream={element}/>)
            }
        </Container>
    );
});

export default DataStreamList;