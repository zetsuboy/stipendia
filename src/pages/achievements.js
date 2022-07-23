import React from 'react';
import './css/achievements.css'
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const selectOptions = ["Select1", "Select2", "Select3", "Select4"];
const achievements = [{"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020"}]

class AchievementsItem extends React.Component {
    render() {
        return(
            <div className='achievement'>
                <label>{this.props.Title}</label>
                <span>{this.props.Status}</span>
                <span>{this.props.Date}</span>
            </div>
        )
    }
}

class AchievementsBlock extends React.Component {
    render() {
        return(
            <div className='achievementsBlock'>
                <div className='firstLine'>
                    <button>+ Добавить достижение</button>
                    <div className='searchBar'>
                        <img/>
                        <input type='text' placeholder='Поиск..'/>
                    </div>
                </div>
                <select>
                    <option selected hidden disabled>сортировка</option>
                    {selectOptions.map((value, index) => {
                        return <option value={value}>{value}</option>
                    })}
                </select>
                <div className='achievements'>
                    {achievements.map((value, index) => {
                        return <AchievementsItem Title={value.title} Status={value.status} Date={value.date}/>
                    })}
                </div>
                <button className='downloadButton'>выгрузить страницу</button>
            </div>
        )
    }
}

class Achievements extends React.Component {
    render(){
        return(
            <div>
                <SiteHeader/>
                <AchievementsBlock/>
                <SiteFooter/>
            </div>
        )
    }
}

export default Achievements;