import React from 'react';
import './css/main.css';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import Button from 'react-bootstrap/Button';

class SiteDescription extends React.Component {
    render() {
        return(
            <div className="siteDescriptionBlock">
                <label id="headText">Крутой завлекающий текст</label>
                <label id="description">Описание описание описание описание описание</label>
                <Button id='button'>Виды стипендий</Button>
            </div>
        );
    }
}

class ActivityItem extends React.Component {
    render() {
        return(
            <div className="activityItemBlock">
                <img className="activityImage" src={this.props.ImgSrc}/>
                <label>{this.props.title} <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.83301 20H39.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.5 1.33301L39.1667 19.9997L20.5 38.6663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></label>
                {this.props.InDevelopment ?
                    <span>*в разработке</span> : null}
            </div>
        );
    }
}

class SiteActivityBlock extends React.Component {
    render() {
        return(
            <div className="siteActivityBlock">
                <ActivityItem className="ActivityNames" title="податься на стипендию" ImgSrc="./images/grants.png"/>
                <ActivityItem className="ActivityNames" title="добавить достижение" ImgSrc="./images/achiev.png"/>
                <ActivityItem className="ActivityNames" title="добавить отчет" ImgSrc="./images/reports.png" InDevelopment="true"/>
            </div>
        );
    }
}

class FaqQuestion extends React.Component {
    render() {
        return (
            <div className="FaqQuestion">
                <label className="question">{this.props.Question}</label>
                <span className="answer">{this.props.Answer}</span>
            </div>
        );
    }
}

class SiteFaqBlock extends React.Component {
    render() {
        return(
            <div className="siteFaqBlock">
                <label id="FaqLabel">F.A.Q.*</label>
                <FaqQuestion Question="Вопрос 1" Answer="Ответ ответ ответ"/>
                <FaqQuestion Question="Вопрос 2" Answer="Ответ ответ ответ"/>
                <span className="note">*больше ответов на часто задаваемые вопросы вы можете найти в группе ВК</span>
            </div>
        )
    }
}

function MainPage() {
    return (
            <div>
                <SiteHeader/>
                <SiteDescription/>
                <SiteActivityBlock/>
                <SiteFaqBlock/>
                <SiteFooter/>
            </div>
    );
}

export default MainPage;
