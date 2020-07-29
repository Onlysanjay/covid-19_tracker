import React, { Component } from 'react';
import axios from 'axios';
import './home.css';
import { Navbar} from 'react-bootstrap';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            firstName: '',
            lastName: '',
            email: '',
            message: '',
            selectedFile: null,
            previewImg: null,
            documentName: []
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, message: '' })
    }
    cros_policy = "https://cors-anywhere.herokuapp.com/";
    packageId;
    headers = {
        'Authorization': "Basic OHE5ZGFmYndkU3NJOnRJQVZDN0hMVjlvVg=="
    }
    // Submit Document
    submitDocument = (e) => {
        e.preventDefault();
        const validateEmail = (email) => {
            var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            return re.test(email);
        }
        if (this.state.name == '' || this.state.firstName == '' || this.state.lastName == '' || this.state.email == '') {
            this.setState({ message: "Please enter Manditory fields." });
        }
        else if (validateEmail(this.state.email)) {
            this.setState({ message: null })
        }
        console.log(this.state)
        var data = {

            "name": this.state.name,
            "description": this.state.description,
            "roles": [
                {
                    "signers": [
                        {
                            "firstName": this.state.firstName,
                            "lastName": this.state.lastName,
                            "email": this.state.email
                        }
                    ]

                }
            ]

        }

        console.log(data);
        var url = this.cros_policy + 'https://sandbox.esignlive.com/api/packages';
        axios.post(url, data, { headers: this.headers })
            .then(res => {
                console.log(res);
                this.packageId = res.data['id'];
                localStorage.setItem("packageId", this.packageId)
                alert("Created Sucessfully");
                this.retrieveDocuments();
            })
            .catch(error => console.log(error))
    }
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }
    // Document Upload API
    uploadDoc = (e) => {
        e.preventDefault();
        var uploadUrl = this.cros_policy + 'https://sandbox.esignlive.com/api/packages/{packageId}/documents';
        const packageId = localStorage.getItem('packageId')
        var url = uploadUrl.replace('{packageId}', packageId)
        const formData = new FormData();

        formData.append("payload", "{\"name\":\"sample\"}")
        formData.append("file", this.state.selectedFile)
        axios.post(url, formData, { headers: this.headers })
            .then(res => {
                console.log(res);
                alert('Document uploded sucessfully.');
                this.retrieveDocuments();
            })
            .catch(error => console.log(error))
    }


    componentDidMount() {
        var url = this.cros_policy + "https://sandbox.esignlive.com/api/packages"
        axios.get(url, { headers: this.headers })
            .then(res => {
                // console.log(res.data.results[0].documents);
                if (res.data) {
                    this.setState({ documentName: res.data.results[0].documents })
                    // this.setState({previewImg:URL.createObjectURL(res.data.results[0].documents.pages[0].id)})
                }
            })
            .catch(error => console.log(error));
    }

    //getDocuments

    retrieveDocuments = () => {
        var url = this.cros_policy + "https://sandbox.esignlive.com/api/packages"
        axios.get(url, { headers: this.headers })
            .then(res => {
                if (res.data) {
                    this.setState({ documentName: res.data.results[0].documents })
                }

            })
            .catch(error => console.log(error))
    }

    //Get role id & DocumentId
    prepareToSend = (e) => {
        e.preventDefault();
        var url = this.cros_policy + 'https://sandbox.esignlive.com/api/packages';
        axios.get(url, { headers: this.headers })
            .then(res => {
                console.log(res.data)
                localStorage.setItem('role', res.data.results[0]['roles'][0].id)
                localStorage.setItem('documentId', Object.values(res.data.results[0].documents).map(res => res.id))
                localStorage.setItem('fullName', res.data.results[0]['roles'][0].signers[0].firstName + res.data.results[0]['roles'][0].signers[0].lastName)
                this.signDocument();
            })
            .catch(error => console.log(error));
    }

    //Document Signature placeholder

    signDocument = () => {
        var url = this.cros_policy + 'https://sandbox.esignlive.com/api/packages/{packageId}/documents/{documentId}'
        var packageUrl = url.replace('{packageId}', localStorage.getItem('packageId'));
        var documentId = localStorage.getItem('documentId').split(',');
        var documentSigningUrl = packageUrl.replace('{documentId}', documentId[1]);
        var data = {
            "approvals": [
                {
                    "role": localStorage.getItem('role'),
                    "fields": [
                        {
                            "page": 0,
                            "top": 260,
                            "subType": localStorage.getItem('fullName'),
                            "height": 33,
                            "left": 194,
                            "width": 223,
                            "type": "SIGNATURE"
                        }
                    ]
                }
            ]
        }
        axios.put(documentSigningUrl,data,{headers:this.headers})
        .then(()=>alert("Documet is ready to send for signature."))
        .catch(error=>console.log(error))
    }

    //Send for Signature
    submit = (e) => {
        e.preventDefault();
        var url = this.cros_policy + 'https://sandbox.esignlive.com/api/packages/{packageId}';
        var packageUrl = url.replace('{packageId}', localStorage.getItem('packageId'));
        const data = {
            "status": "SENT"
        }
        axios.put(packageUrl, data, { headers: this.headers })
            .then(() => {
                alert("Documet Send for signature")
                // localStorage.removeItem('packageId')
                // localStorage.removeItem('documentId')
                // localStorage.removeItem('role')
            })
            .catch(error => { console.log(error) })

    }

    render() {
        return (
            <React.Fragment>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Welcome to OneSpan Sign</Navbar.Brand>
          </Navbar>
                <div className="container">
                    <strong className="myColor">Transaction details</strong><hr />
                    <form>
                        <div className="row">
                            <div className="col-md-1">
                                <label for="name">Name *</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" id="name" autoComplete="off" className="form-control" name="name" onChange={this.handleChange} required />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <label for="description">Description</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" id="description" className="form-control" autoComplete="off" name="description" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-md-offset-6">
                                <strong className="myColor">Recipient</strong><hr />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" id="firstName" autoComplete="off" placeholder="First Name *" className="form-control" name="firstName" onChange={this.handleChange} />
                                </div>


                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" id="lastName" autoComplete="off" placeholder="Last Name *" name="lastName" className="form-control" onChange={this.handleChange} />
                                </div>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="email" id="email" autoComplete="off" placeholder="Email *" name="email" className="form-control" onChange={this.handleChange} />
                                </div>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <div className='error'>
                                    {this.state.message !== ''}{this.state.message}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <button type="button" className="btn btn-primary btn-sm" onClick={this.submitDocument} disabled={this.state.name == '' || this.state.firstName == '' || this.state.lastName == '' || this.state.email == ''}>Submit</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-md-offset-6">
                                <strong className="myColor">Documents</strong><hr />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5" col-md-offset-1>
                                <ol type="1">
                                    {this.state.documentName.map(res => {
                                        return this.state.documentName !== [] ? (
                                            <li key={res.id} className="listColor">{res.name} </li>



                                        ) : <p className="error">No Documents to display.</p>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group"><input type="file" onChange={this.onFileChange} />
                                    <button className="btn btn-sm btn-primary" onClick={this.uploadDoc} disabled={this.state.selectedFile == null}>Upload</button>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <button className="btn btn-sm btn-primary" onClick={this.prepareToSend}>Prepare to Sign</button>
                            </div>
                        </div>

                    </form>
                    <div className="row">
                        <div className="col-md-12 col-md-offset-6">
                            <button className="btn btn-warning btn-sm" onClick={this.submit}>Send to Sign</button>
                        </div>
                    </div>
                </div>

            </React.Fragment>)


    }

}



export default Home;