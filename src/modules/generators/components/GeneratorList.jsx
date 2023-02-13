import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import GeneratorItem from "./GeneratorItem";

const GeneratorList = observer(({generators}) => {
    return (
        <Container fluid className="row">
            {
                generators.map((generator, index) => <GeneratorItem key={index} generator={generator}/>)
            }
        </Container>
    );
});

export default GeneratorList;