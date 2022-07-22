import React from 'react';
import './css/SiteHeader.css';
import RouteLabel from './RouteLabel';

class SiteHeader extends React.Component{
    render() {
        return(
            <nav>
                <header className="siteHeader">
                    <RouteLabel RouteTitle="главная" Route="" />
                    <RouteLabel RouteTitle="стипендии" Route="grants" />
                    <RouteLabel RouteTitle="достижения" Route="achievements" />
                    <RouteLabel RouteTitle="отчеты" Route="reports" />
                </header>
            </nav>
        );
    }
}

export default SiteHeader;