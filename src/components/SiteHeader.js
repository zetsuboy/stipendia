import React from 'react';
import './css/SiteHeader.css';
import RouteLabel from './RouteLabel';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

class ModalWindow extends React.Component {
    constructor() {
        super();
        this.state = {submitDisabled: false, username: "", password: "", loginError: {message: "", hidden: true},
        signInShow: false}
    }

    signInClose = () => {
        this.setState({signInShow: false})
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({submitDisabled: true})

        const user = {
            email: this.state.username,
            password: this.state.password
        };

        console.log(user);

        axios.post(`https://limits.digital:3500/api/user/signin`, user)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                this.setState({loginError: {message: "", hidden: true}})
                this.props.loggedIn();
            }).catch(error => {
            console.log(error.response)
            this.setState({loginError: {message: error.response.data.message, hidden: false}})
        }).then(() => {
            this.setState({submitDisabled: false})
        });
    }

    render() {
        return(
            <div>
                <Modal
                    show={this.props.show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className="contained-modal-title-vcenter">
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='modalBody'>
                            <input type='text' name='username' onChange={this.handleChange}></input>
                            <input type='text' name='password' onChange={this.handleChange}></input>
                            <Button disabled={this.state.submitDisabled} onClick={this.handleSubmit}>Войти</Button>
                            {!this.state.loginError.hidden && <span>{this.state.loginError.message}</span>}
                            <a onClick={() => this.setState({signInShow: true})}>Впервые у нас? Зарегистрируйтесь!</a>
                            <SignupModal show={this.state.signInShow} title='Регистрация' signInClose={this.signInClose}
                            SignedUp={() => {this.props.loggedIn(); this.setState({signInShow: false})}}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.loginClose}>закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class SignupModal extends React.Component {
    constructor() {
        super();
        this.state = {submitDisabled: false, username: "", password: "", password_repeat: "", passwords_same: true,
            firstName: "", lastName: "", patronymic: "",  signInError: {message: "", hidden: true}}
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({submitDisabled: true})

        const user = {
            email: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            patronymic: this.state.patronymic
        };

        console.log(user);

        axios.post(`https://limits.digital:3500/api/user/signup`, user)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                this.setState({loginError: {message: "", hidden: true}})
                this.props.SignedUp();
            }).catch(error => {
            console.log(error.response)
            this.setState({loginError: {message: error.response.data.message, hidden: false}})
        }).then(() => {
            this.setState({submitDisabled: false})
        });
    }

    render() {
        return(
            <Modal
                show={this.props.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title className="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modalBody'>
                        <input type='text' name='username' onChange={this.handleChange}/>
                        <input type='password' name='password' onChange={this.handleChange}/>
                        <input type='password' name='password_repeat' onChange={this.handleChange}/>
                        {!(this.state.password === this.state.password_repeat) && <span>Пароли не совпадают!</span>}
                        <input type='text' name='firstName' onChange={this.handleChange}/>
                        <input type='text' name='lastName' onChange={this.handleChange}/>
                        <input type='text' name='patronymic' onChange={this.handleChange}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSubmit}>зарегистрироваться</Button>
                    <Button onClick={this.props.signInClose}>закрыть</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class SiteHeader extends React.Component{
    constructor() {
        super();
        this.state = {logged: Boolean(localStorage.getItem("token")), loginShow: false, createShow: false}
        this.loginClick = this.loginClick.bind(this);
        this.loginCloseClick = this.loginCloseClick.bind(this)
        this.logoutClick = this.logoutClick.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    loginClick() {
        this.setState({loginShow: true})
    }

    loginCloseClick() {
        this.setState({loginShow: false})
    }

    logoutClick() {
        localStorage.clear();
        this.setState({logged: false})
    }

    loggedIn() {
        this.loginCloseClick();
        this.setState({logged: true})
    }

    render() {
        return(
            <div>
                <nav>
                    <header className="siteHeader">
                        <RouteLabel RouteTitle="главная" Route="" />
                        <RouteLabel RouteTitle="стипендии" Route="grants" />
                        <RouteLabel RouteTitle="достижения" Route="achievements" />
                        <RouteLabel RouteTitle="отчеты" Route="reports" />
                        {this.state.logged
                            ? <a onClick={this.logoutClick}>выйти</a>
                            : <a onClick={this.loginClick}>аккаунт</a>}
                    </header>
                </nav>
                <ModalWindow title='Войти в аккаунт' show={this.state.loginShow} loginClose={this.loginCloseClick}
                loggedIn={this.loggedIn}/>
            </div>
        );
    }
}

export default SiteHeader;