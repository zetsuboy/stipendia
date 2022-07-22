import React from 'react';
import './css/SiteFooter.css';
import RouteLabel from "./RouteLabel";

class SiteFooter extends React.Component {
    render() {
        return(
            <div className="siteFooter">
                <label>сообщить об ошибке</label>
                <label>стипендия</label>
                <label>достижения</label>
                <label>отчеты</label>
                <label>пользовательское соглашение</label>
            </div>
        )
    }
}

export default SiteFooter;