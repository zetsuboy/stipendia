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

class MyVerticallyCenteredModal extends React.Component {
    constructor() {
        super();
        this.state = {requestCancelWindowShow: false}
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
                                : <Button>податься на стипендию</Button>}
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
            </div>
        );
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
                <MyVerticallyCenteredModal show={this.state.modalShow} handleClick={this.closeModalClick}
                                           title={this.state.modalTitle} desc={this.state.modalDesc} requestSent={this.state.requestSent}/>
                <RequestsBlock/>
                <SiteFooter/>
            </div>
        )
    }
}

export default GrantsPage;