import React from 'react';
import './css/grants.css';
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const grants = [{"title": "Губер", "description": "Описание губера", "requestSent": false},
    {"title": "Губер2", "description": "Описание губера2", "requestSent": true},
    {"title": "Губер3", "description": "Описание губера3", "requestSent": false},
    {"title": "Губер3", "description": "Описание губера3", "requestSent": false}]

const requests = [{"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"},
    {"title": "Название стипендии", "status": "статус заявки", "date": "01.01.2020"}]

class GrantModal extends React.Component {
    constructor() {
        super();
        this.state = {requestCancelWindowShow: false, requestModalShow: false}
        this.cancelRequestClick = this.cancelRequestClick.bind(this)
    }

    cancelRequestClick() {
        this.setState({requestModalShow: false})
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    dialogClassName='modalWindow'
                >
                    <Modal.Header>
                        <Modal.Title className="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.desc}</p>
                        <div className='imagesBlock'>
                            <img width="250px" height="250px"/>
                            <img width="250px" height="250px"/>
                            <img width="250px" height="250px"/>
                        </div>
                        <div className='modalButtonsBlock'>
                            <Button>скачать вложения</Button>
                            {this.props.requestSent
                                ? <Button className='canselRequestButton' onClick={() => {this.setState({requestCancelWindowShow: true})}}></Button>
                                : <Button onClick={() => {this.setState({requestModalShow: true})}}>податься на стипендию</Button>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClick}>закрыть</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.requestCancelWindowShow}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    dialogClassName='modalWindow'>
                    <Modal.Body>
                        <span>Вы действительно хотите отозвать заявку?</span>
                        <div className='modalConfirmationButtonsBlock'>
                            <Button className='ConfirmationButton' onClick={() => {this.setState({requestCancelWindowShow: false})}}>Да</Button>
                            <Button className='ConfirmationButton' onClick={() => {this.setState({requestCancelWindowShow: false})}}>Нет</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                <GrantRequestModal show={this.state.requestModalShow} cancelRequestClick={this.cancelRequestClick}/>
            </div>
        );
    }
}

class GrantRequestModal extends React.Component {
    render() {
        return(
            <div>
                <Modal
                    show={this.props.show}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    dialogClassName='modalRequestWindow'
                >
                    <Modal.Body>
                        <h1>Податься на стипендию</h1>
                        <h4>Заявитель несет ответственность за предоставление информации в соответствии с законодательством Российской Федерации и локальными нормативными актами ДВФУ</h4>
                        <form>
                            <h5>1. Скан паспорта (временное удостоверение личности)</h5>
                            <input type='file' name='passport' placeholder='загрузить'/>
                            <h5>2. Характеристика с указанием конкретных достижений за последние полгода</h5>
                            <input type='file' name='achievements' placeholder='загрузить'/>
                            <h5>3. Согласие на обработку персональных данных</h5>
                            <input type='file' name='agreement' placeholder='загрузить'/>
                            <h5>4. Выберите категорию</h5>
                            <select>
                                <option selected disabled hidden></option>
                                <option>123</option>
                            </select>
                            <h5>5. Выберите достижения, соответствующие следующим критериям: </h5>
                            <select multiple size='5'>
                                <option selected disabled hidden></option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                e.currentTarget.selected = !e.currentTarget.selected;
                                e.currentTarget.parentElement.focus()}}>Достижение 1</option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    e.currentTarget.parentElement.focus()}}>Достижение 2</option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    e.currentTarget.parentElement.focus()}}>Достижение 3</option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    e.currentTarget.parentElement.focus()}}>Достижение 4</option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    e.currentTarget.parentElement.focus()}}>Достижение 5</option>
                                <option onMouseDown={(e) => {e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    e.currentTarget.parentElement.focus()}}>Достижение 6</option>
                            </select>
                            <h5>5. Заявитель несет ответственность за достоверность предоставляемой информации в соответствии
                                с Законодательством Российской Федерации и нормативными локальными актами ДВФУ</h5>
                            <div className='checkboxBlock'>
                                <input type='checkbox' name='userAgree' id='userAgree'/>
                                <label for='userAgree'>подтверждаю</label>
                            </div>
                            <div className='requestModalButtonsBlock'>
                                <Button>податься на стипендию</Button>
                                <Button onClick={this.props.cancelRequestClick}>отмена</Button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class GrantsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {requestSent: this.props.requestSent}
    }
    render() {
        return(
            <div className='grantsItemBlock' onClick={event => this.props.handleClick(this.props.GrantsTitle,
                this.props.GrantsDesc, this.state.requestSent)}>
                <label>{this.props.GrantsTitle} <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.83301 20H39.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.5 1.33301L39.1667 19.9997L20.5 38.6663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></label>
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
                    return <GrantsItem GrantsTitle={value.title} GrantsDesc={value.description}
                                       handleClick={this.props.handleClick} requestSent={value.requestSent}/>
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
    constructor() {
        super();
        this.state = {modalShow: false, modalTitle: "Default title", modalDesc: "Default description", requestSent: false}
        this.openModalClick = this.openModalClick.bind(this);
        this.closeModalClick = this.closeModalClick.bind(this);
    }

    openModalClick = (title, desc, requestSent) => {
        this.setState({modalShow: true, modalTitle: title, modalDesc: desc, requestSent: requestSent})
    }

    closeModalClick() {
        this.setState({modalShow: false})
    }

    render() {
        return(
            <div>
                <SiteHeader/>
                <GrantsBlock handleClick={this.openModalClick}/>
                <GrantModal show={this.state.modalShow} handleClick={this.closeModalClick} title={this.state.modalTitle}
                            desc={this.state.modalDesc} requestSent={this.state.requestSent}/>
                <RequestsBlock/>
                <SiteFooter/>
            </div>
        )
    }
}

export default GrantsPage;