import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import MainPage from './pages/main';
import GrantsPage from './pages/grants'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/grants' element={<GrantsPage/>} />
                    <Route path='/achievements' element={<MainPage/>} />
                    <Route path='/reports' element={<MainPage/>} />
                </Routes>
            </BrowserRouter>)
    };
}

export default App;
