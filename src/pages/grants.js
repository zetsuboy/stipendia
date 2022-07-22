import React from 'react';
import './css/grants.css';
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const grants = [{"title": "Губер", "description": "Описание губера"},
    {"title": "Губер2", "description": "Описание губера2"},
    {"title": "Губер3", "description": "Описание губера3"},
    {"title": "Губер3", "description": "Описание губера3"}]

const requests = [{"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"}]

class GrantsItem extends React.Component {
    render() {
        return(
            <div className='grantsItemBlock'>
                <label>{this.props.GrantsTitle}</label>
                <span>{this.props.GrantsDesc}</span>
            </div>
        )
    }
}

class GrantsBlock extends React.Component {
    render() {
        return(
            <div className='grantsBlock'>
                {grants.map((value, index) => {
                    return <GrantsItem GrantsTitle={value.title} GrantsDesc={value.description}/>
                })}
            </div>
        )
    }
}

class RequestItem extends React.Component {
    render() {
        return(
            <div className='request'>
                <label>{this.props.RequestTitle}</label>
                <span>{this.props.Status}</span>
                <span>{this.props.Date}</span>
            </div>
        )
    }
}

class RequestsBlock extends React.Component {
    render() {
        return(
            <div className='requestsBlock'>
                <label id='myRequests'>Мои заявки</label>
                <div className='requests'>
                    {requests.map((value, index) => {
                        return <RequestItem RequestTitle={value.title} Status={value.status} Date={value.date}/>
                    })}
                </div>
            </div>
        )
    }
}

class GrantsPage extends React.Component {
    render() {
        return(
            <div>
                <SiteHeader/>
                <GrantsBlock/>
                <RequestsBlock/>
                <SiteFooter/>
            </div>
        )
    }
}

export default GrantsPage;