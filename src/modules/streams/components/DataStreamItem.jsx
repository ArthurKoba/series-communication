import React from 'react';
import {Card} from "react-bootstrap";

const DataStreamItem = ({stream}) => {
    return (
        <Card>
            <Card.Header>
                {stream.id} | {stream.name}
            </Card.Header>
        </Card>
    );
};

export default DataStreamItem;