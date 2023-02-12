import {BrowserRouter, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";

import Layout from "./layout/Layout";
import Generators from "./modules/generators/Generators";
import SerialPorts from "./modules/serialports/SerialPorts";
import DataStreams from "./modules/streams/DataStreams";
import Charts from "./modules/charts/Charts";


const App = observer(() => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Charts/>}/>
                    <Route path="/serial" element={<SerialPorts/>}/>
                    <Route path="/dataStreams" element={<DataStreams/>}/>
                    <Route path="/generators" element={<Generators/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
})

export default App;
