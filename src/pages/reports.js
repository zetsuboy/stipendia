import React from 'react';
import './css/reports.css';
import SiteFooter from "../components/SiteFooter";
import siteHeader from "../components/SiteHeader";
import SiteHeader from "../components/SiteHeader";

class InDevelopmentBlock extends React.Component {
    render() {
        return(
            <label>Данная страница находится в разработке!</label>
        )
    }
}

class Reports extends React.Component {
    render() {
        return(
            <div>
                <SiteHeader/>
                <InDevelopmentBlock/>
                <SiteFooter/>
            </div>
        )
    }
}

export default Reports;