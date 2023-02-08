import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
