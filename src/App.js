import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./pages/layout/Navbar";
import Sidebar from "./pages/layout/Sidebar";
import Content from "./pages/layout/Content";
import Footer from "./pages/layout/Footer";
import {observer} from "mobx-react-lite";
import designStorage from "./store/designStorage";
import Generators from "./modules/generators/Generators";
import SerialPorts from "./modules/serialports/SerialPorts";
import DataStreams from "./modules/streams/DataStreams";


const App = observer(() => {

    let classes = "layout-fixed layout-navbar-fixed layout-footer-fixed "
    classes += designStorage.darkMode? "dark-mode": ""
    return (
        <div className={classes}>
            <div className="wrapper">
                <BrowserRouter>
                    <Navbar></Navbar>
                    <Sidebar></Sidebar>
                    <Content>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/serial" element={<SerialPorts/>}/>
                            <Route path="/dataStreams" element={<DataStreams/>}/>
                            <Route path="/generators" element={<Generators/>}/>
                        </Routes>
                    </Content>
                    <Footer></Footer>
                </BrowserRouter>
            </div>
        </div>
    );
})

export default App;
