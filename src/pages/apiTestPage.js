import React from 'react';
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import axios from "axios";
import FormData from "form-data";

class UsersList extends React.Component {
    constructor() {
        super();
        this.state = ({image: null})
        this.onFileChange = this.onFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(`https://limits.digital:3500/api/users`)
            .then(res => {
                console.log(res);
            }).catch(error => {
            console.log(error.response)
        });

        let formData = new FormData();
        formData.append('avatar', this.state.image);

        console.log(formData.get('avatar'));

        axios.post(`https://limits.digital:3500/api/user/upload-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                "token": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
            }).catch(error => {
            console.log(error.response)
        });
    }

    onFileChange(e) {
        const files = e.target.files;
        this.setState({image: files[0]})
    }

    render() {
        return(
            <form>
                <input type='file' name='file' onChange={this.onFileChange}/>
                <input type='submit' onClick={this.handleSubmit}/>
            </form>
        )
    }
}


class ApiTestPage extends React.Component {
    render() {
        return(
            <div>
                <SiteHeader/>
                <UsersList/>
                <SiteFooter/>
            </div>
        )
    }
}

export default ApiTestPage;