import React from 'react';
import {BrowserRouter, Route, Routes, Link, NotFoundRoute} from "react-router-dom";
import MainPage from './pages/main';
import GrantsPage from './pages/grants'
import Achievements from "./pages/achievements";
import Reports from "./pages/reports";
import UndefinedPage from "./pages/undefinedPage";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/grants' element={<GrantsPage/>} />
                    <Route path='/achievements' element={<Achievements/>} />
                    <Route path='/reports' element={<Reports/>} />
                    <Route path='*' element={<UndefinedPage/>} />
                </Routes>
            </BrowserRouter>)
    };
}

export default App;
