import React from 'react';
import './css/undefinedPage.css';
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

class InfoBlock extends React.Component {
    render() {
        return(
            <label>Данная страница не найдена!</label>
        )
    }
}

class UndefinedPage extends React.Component {
    render() {
        return(
            <div>
                <SiteHeader/>
                <SiteFooter/>
            </div>
        )
    }
}

export default UndefinedPage;