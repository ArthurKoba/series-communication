import React from 'react';
import {Container} from "react-bootstrap";
import generatorManagerStorage from "../../store/generatorManagerStorage";
import {observer} from "mobx-react-lite";
import GeneratorItem from "./GeneratorItem";

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