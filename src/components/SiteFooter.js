import React from 'react';
import './css/SiteFooter.css';
import RouteLabel from "./RouteLabel";

class SiteFooter extends React.Component {
    render() {
        return(
            <footer className="siteFooter">
                <RouteLabel RouteTitle="сообщить об ошибке" Route="" />
                <RouteLabel RouteTitle="стипендии" Route="grants" />
                <RouteLabel RouteTitle="достижения" Route="achievements" />
                <RouteLabel RouteTitle="отчеты" Route="reports" />
                <RouteLabel RouteTitle="пользовательское соглашение" Route="" />
            </footer>
        )
    }
}

export default SiteFooter;