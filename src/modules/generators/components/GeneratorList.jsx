import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

import GeneratorItem from "./GeneratorItem";
import generatorManagerStorage from "../store/generatorManagerStorage";

const GeneratorList = observer(() => {
    return (
        <Container fluid className="row">
            {
                generatorManagerStorage.generators.map((generator, index) =>
                    <GeneratorItem key={index} generator={generator} />)
            }
        </Container>
    );
});

export default GeneratorList;