import React from 'react';
import './css/achievements.css'
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const selectOptions = ["Select1", "Select2", "Select3", "Select4"];
const achievements = [{"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020", "filters": ["Select1", "Select2"]},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020", "filters": ["Select2"]},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020", "filters": ["Select1", "Select4"]},
    {"title": "Название достижения", "status": "статус заявки", "date": "01.01.2020", "filters": ["Select3", "Select2"]}]

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
    constructor() {
        super();
        this.state = {searchText: "", filter: ""};
    }
    render() {
        return(
            <div className='achievementsBlock'>
                <div className='firstLine'>
                    <Button>+ Добавить достижение</Button>
                    <div className='searchBar'>
                        <img/>
                        <input type='text' placeholder='Поиск..' onChange={(e) =>
                        {this.setState({searchText: e.target.value})}}/>
                    </div>
                </div>
                <select onChange={(e) => this.setState({filter: e.target.value})}>
                    <option value="" selected hidden disabled>сортировка</option>
                    <option value=""></option>
                    {selectOptions.map((value, index) => {
                        return <option value={value}>{value}</option>
                    })}
                </select>
                <div className='achievements'>
                    {achievements.length === 0
                    ? <span id='noAchievementsSpan'>У вас пока нет загруженных достижений!</span>
                    : achievements.map((value, index) => {
                       return (value.title.includes(this.state.searchText) &&
                       (value.filters.includes(this.state.filter) || this.state.filter === ""))
                            ? <AchievementsItem Title={value.title} Status={value.status} Date={value.date}/>
                            : null
                    })}
                </div>
                <Button className='downloadButton'>выгрузить страницу</Button>
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