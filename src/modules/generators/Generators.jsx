import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";

import GeneratorList from "./components/GeneratorList";
import appStorage from "../../appStorage";


const Generators = observer(() => {
    return (
        <Container fluid className="row justify-content-center">
            <Button onClick={() => appStorage.generatorsManager.createGenerator()} className="mt-3 col-6">
                Add generator</Button>
            <GeneratorList generators={appStorage.generatorsManager.generators}/>
        </Container>
    );
});

export default Generators;