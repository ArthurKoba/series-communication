import React from 'react';
import {observer} from "mobx-react-lite";

import {Card, Container} from "react-bootstrap";

const DataStreamItem = observer(({stream}) => {
    return (
        <Container fluid className="col-6 p-1 text-start">
            <Card>
                <Card.Body>
                    <Card.Title>
                        <span>ID: {stream.id}</span>
                    </Card.Title>
                    <span>Count Data: {stream.countData}</span>
                </Card.Body>
            </Card>
        </Container>
    );
});

export default DataStreamItem;