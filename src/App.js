import './App.css';
import React from 'react';

class SiteHeader extends React.Component{
    render() {
        return(
            <header className="siteHeader">
                <label>главная</label>
                <label>стипендии</label>
                <label>достижения</label>
                <label>отчеты</label>
            </header>
        );
    }
}

class SiteDescription extends React.Component {
    render() {
        return(
        <div className="siteDescriptionBlock">
            <label id="headText">Крутой завлекающий текст</label>
            <label id="description">Описание описание описание описание описание</label>
            <button id="button">Виды стипендий</button>
        </div>
        );
    }
}

class ActivityItem extends React.Component {
    render() {
        return(
            <div className="activityItemBlock">
                <img className="activityImage" src={this.props.ImgSrc}/>
                <label>{this.props.title}</label>
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
              <ActivityItem title="податься на стипендию" ImgSrc="./images/DNC.jpg"/>
              <ActivityItem title="добавить достижение" ImgSrc={null}/>
              <ActivityItem title="добавить отчет" ImgSrc={null} InDevelopment="true"/>
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
                <span>*больше ответов на часто задаваемые вопросы вы можете найти в группе ВК</span>
            </div>
        )
    }
}

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

function App() {
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

export default App;
