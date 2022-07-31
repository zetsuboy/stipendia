import React, {useState, useEffect} from 'react';
import './css/achievements.css'
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import ReactDom from "react-dom";

const selectOptions = ["Select1", "Select2", "Select3", "Select4"];

class AchievementsItem extends React.Component {
    render() {
        return(
            <div className='achievement'>
                <label>{this.props.Id}. {this.props.Title}</label>
                <span>{this.props.Status}</span>
                <span>{this.props.Date}</span>
            </div>
        )
    }
}

class AchievementsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: "", filter: "", achievements: [], achievementsStatus: {message: "Загрузка..", show: true}};
    }

    componentDidMount() {
        axios.post(`https://limits.digital:3500/api/activity/user`, {}, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                let ach_array = [];
                for (let i in res.data) {
                    ach_array.push(res.data[i])
                }
                if (ach_array.length == 0)
                    this.setState({achievementsStatus: {message: "У вас пока нет загруженных достижений!", show: true}})
                else
                    this.setState({achievements: ach_array, achievementsStatus: {message:"", show: false}})
                console.log(this.state.achievements);
            }).catch(error => {
            console.log(error.response)
            this.setState({achievementsStatus: {message: "Ошибка загрузки!", show: true}})
        });
    }

    render() {
        return(
            <div className='achievementsBlock'>
                <div className='firstLine'>
                    <Button onClick={this.props.openModalClick}>+ Добавить достижение</Button>
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
                    {this.state.achievementsStatus.show
                    ? <span id='noAchievementsSpan'>{this.state.achievementsStatus.message}</span>
                    : this.state.achievements.map((value, index) => {
                       return (value.activityName.includes(this.state.searchText))
                           //(value.filters.includes(this.state.filter) || this.state.filter === "")
                            ? <AchievementsItem Id={value.activityId} Title={value.activityName} Status={value.activityStatus} Date={value.activityDateTime}/>
                            : null
                    })}
                </div>
                <Button className='downloadButton'>выгрузить страницу</Button>
            </div>
        )
    }
}

function AchievementRequestModal(props) {
    const [allFields, setAllFields] = useState([])
    const [fieldsData, setFieldsData] = useState({});
    const [requestState, setRequestState] = useState({error:false, name: "", jsonDescription: "", jsonObjects: {id: null, name: "",
                type:"", select: []}})

    useEffect(() => {
        axios.post(`https://limits.digital:3500/api/res/activity`, {"name": "newActivity"}, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log("Результат реквеста ", res.data)
                let arr = res.data.map(item => {
                    let str = item.jsonObjects.replace('\"','"');
                    const jObj = JSON.parse(str);
                    setRequestState({error: false, name: item.name, jsonDescription: item.jsonDescription,
                        jsonObjects: jObj})
                })
            }).catch(error => {
            console.log(error.response)
            setRequestState({error: true, result: null})
        });
    }, [])

    const handleChange = event => {
        setAllFields([]);
        const sender = event.target.value;
        axios.post(`https://limits.digital:3500/api/res/activity`, {"name": sender}, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                let arr = res.data.map(item => {
                    let str = '[' + item.jsonObjects.replace('\"','"') + ']';
                    const jObj = JSON.parse(str);
                    const activity = {name: item.name, jsonDescription: item.jsonDescription,
                            jsonObjects: jObj}
                    console.log(activity.jsonObjects)
                    activity.jsonObjects.map(val => {
                        let selectState = val.type == "select"
                            ? val.select
                            : null
                        setAllFields(values => [...values, {id: val.id, type: val.type, name: val.name, description: val.description, select: selectState}]);
                    })
                    console.log(allFields)
                })
            }).catch(error => {
            console.log(error.response)
        });
    }

    const fieldHandle = (e) => {
        if (e.target.type == 'file') {
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append('files', file)
            axios.post("https://limits.digital:3500/api/activity/upload-pdf", formData, {
                headers: {
                    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                    "token": localStorage.getItem("token")
                }
            })
                .then(res => {
                    console.log(res);
                    setFieldsData({
                        [e.target.name]: res.data.pdf
                    })
                    console.log("name", e.target.name);
                    console.log(fieldsData);
                }).catch(error => {
                    console.log(error)
            })
        }
        setFieldsData({
            ...fieldsData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        for (let field in document.getElementById('achModalForm')) {
            formData.append(field.name, field.value)
        }

        axios.post("https://limits.digital:3500/api/activity/new")
    }

        return(
            <div>
                <Modal
                    show={props.show}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Button onClick={props.closeModalClick}>x</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Добавление достижения</h1>
                        <h5>Заявитель несет ответственность за предоставление информации в соответствии с Законодательством Российской Федерации и нормативными локальными актами ДВФУ</h5>
                        <form id='achModalForm'>
                            <select onChange={(event) => {fieldHandle(event); handleChange(event)}}>
                                <option selected hidden>Выбор</option>
                                {requestState.jsonObjects.select.map(item => {
                                    return <option value={item.com}>{item.name}</option>
                                })}
                            </select>
                            {allFields.map((item, index) => (
                                <div>
                                    <label>{item.name}</label>
                                    {item.type == "select"
                                        ? <select name={item.id} onChange={(e) => fieldHandle(e)}>
                                            {item.select.map(option => {
                                                return <option value={option.com}>{option.name}</option>
                                            })}
                                        </select>
                                        : <input type={item.type} name={item.id} onChange={(e) => fieldHandle(e)}></input>}
                                </div>
                            ))}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => handleSubmit(e)}>загрузить достижение</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
}

class Achievements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modalShow: false};
        this.openRequestModal = this.openRequestModal.bind(this);
        this.closeRequestModal = this.closeRequestModal.bind(this);
    }

    openRequestModal() {
        this.setState({modalShow: true});
    }

    closeRequestModal() {
        this.setState({modalShow: false});
    }

    render(){
        return(
            <div>
                <SiteHeader/>
                <AchievementsBlock openModalClick={this.openRequestModal}/>
                <AchievementRequestModal show={this.state.modalShow} closeModalClick={this.closeRequestModal}/>
                <SiteFooter/>
            </div>
        )
    }
}

export default Achievements;