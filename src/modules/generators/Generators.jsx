import React from 'react';
import {Button, Container} from "react-bootstrap";

import GeneratorList from "./components/GeneratorList";
import appStorage from "../../appStorage";


const Generators = () => {
    return (
        <Container fluid className="row justify-content-center">
            <Button onClick={() => appStorage.generatorsManager.newGenerator()} className="mt-3 col-6">
                Add generator</Button>
            <GeneratorList generators={appStorage.generatorsManager.generators}/>
        </Container>
    );
};

export default Generators;