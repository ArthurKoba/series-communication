import React from 'react';
import {Button, Container} from "react-bootstrap";
import GeneratorList from "../components/generators/GeneratorList";
import generatorManagerStorage from "../store/generatorManagerStorage";

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