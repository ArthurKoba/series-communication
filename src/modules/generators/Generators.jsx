import React from 'react';
import {Button, Container} from "react-bootstrap";
import generatorManagerStorage from "./store/generatorManagerStorage";
import GeneratorList from "./components/GeneratorList";

const Generators = () => {
    return (
        <Container fluid className="row justify-content-center">
            <Button onClick={() => generatorManagerStorage.newGenerator()} className="mt-3 col-6">
                Add generator</Button>
            <GeneratorList/>
        </Container>
    );
};

export default Generators;