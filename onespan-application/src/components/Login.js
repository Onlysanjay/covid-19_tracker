import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
class Login extends Component {

    constructor() {
        super();
        this.state = {
            "packageData": '',
            "selectedFile": null
        }
        this.packageNameRef = React.createRef();
        this.packageIdRef = React.createRef();
        this.docNameRef = React.createRef();
    }

    // login = () => {
    //     var url = "https://sandbox.esignlive.com/api/authenticationTokens/user";

    //     const headers = {
    //         'Authorization': "Basic OHE5ZGFmYndkU3NJOnRJQVZDN0hMVjlvVg==",
    //         'Content-Type': 'application/json',
    //     }
    //     axios.post(url,null, { headers: headers })
    //         .then((res) => {
    //             console.log(res);
    //         },
    //         )
    //         .catch(error => console.log(error))
    // }
    cros_policy = "https://cors-anywhere.herokuapp.com/";

    // Method for getting the Package.

    getPackages = () => {
        var packageUrl = this.cros_policy + 'https://sandbox.esignlive.com/api/packages';
        const headers = {
            'Authorization': "Basic OHE5ZGFmYndkU3NJOnRJQVZDN0hMVjlvVg==",
            'Content-Type': 'application/json'
        }
        axios.get(packageUrl, { headers: headers })
            .then(res => {

                this.setState({ packageData: res.data['results'] })
                console.log(Object.values(this.state.packageData))

            })
            .catch(error => {
                console.log(error)
            })
    }
    onFileChange = (e) => {
        e.persist();
        this.setState({ selectedFile: e.target.value })

    }

    // Method for Posting a Package to OneSign API.

    postPackage = (e) => {
        e.preventDefault();
        const data = {
            "name": this.packageNameRef.current.value
        }

        var packageUrl = this.cros_policy + 'https://sandbox.esignlive.com/api/packages';
        const headers = {
            'Authorization': "Basic OHE5ZGFmYndkU3NJOnRJQVZDN0hMVjlvVg==",
            'Content-Type': 'application/json'
        }
        axios.post(packageUrl, data, { headers: headers })
            .then(res => {
                console.log(res);
                alert(data.name + " ,package has created Sucessfully.")
            })
            .catch(error => console.log(error))
    }
    // Method for uploading a Document to Package Id.

    uploadDocument = (e) => {
        e.preventDefault();
        //  var docName=this.docNameRef.current.value;
        //  var fileName=this.state.selectedFile
        //  var d="{\"name\":\"docName\"}"
        //     const formData = {
        //         "file": fileName,
        //         "payload":d
        //   }
        const formData = new FormData();
        formData.append(
            "file", this.state.selectedFile
        )
        formData.append('payload', "{\'name\':\'sample\'}")
        const headers = {
            'Authorization': "Basic OHE5ZGFmYndkU3NJOnRJQVZDN0hMVjlvVg==",
            'Content-Type': 'multipart/form-data'
        }
        var documentUploadApi = this.cros_policy + 'https://sandbox.esignlive.com/api/packages/{packageId}/documents'
        var url = documentUploadApi.replace('{packageId}', this.packageIdRef.current.value);
        axios.post(url, formData, { headers: headers })
            .then(res => {
                console.log(res)
            })
            .catch(error => { console.log(error) })
    }
   
    render() {
        var title = "OneSpan Application";

        return (
            <React.Fragment>
                <div className="container">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1">
                                <header><h6>{title.toUpperCase()}</h6></header><hr />
                            </div>
                        </div>
                        <strong>Package Creation</strong>
                        <form>
                            <div className="row">

                                <div className="col-md-2">
                                    <label>Enter package name</label>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="text" autoComplete="off" className="form-control" ref={this.packageNameRef} />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={this.postPackage}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary btn-sm" onClick={this.getPackages}>Get Packages</button>
                                </div>

                            </div>
                        </div>
                        <table className="table">
                            <thead>    <tr>
                                <th>Package ID </th>
                                <th>Package Name  </th>
                                <th>Status  </th>
                                <th>Created On </th>
                                <th>Updated On </th>
                            </tr>
                            </thead>
                            <tbody>
                                {Object.values(this.state.packageData).map(data => {
                                    return data.id !== undefined ? (<tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.status}</td>
                                        <td>{data.created}</td>
                                        <td>{data.updated}</td>
                                    </tr>) : <strong className="error">No items to display.</strong>
                                })}

                            </tbody>
                        </table><hr />
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1"><strong>Upload Document for a Package</strong></div></div>
                        <form>
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Enter Package Id</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="text" autoComplete="off" className="form-control" ref={this.packageIdRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-2">
                                    <label>Upload File : </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="file" onChange={this.onFileChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Document Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" autoComplete="off" ref={this.docNameRef} />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-1"><div className="btn-group">
                                    <button className="btn btn-primary btn-sm" onClick={this.uploadDocument}>Submit</button>
                                </div></div>
                            </div>
                        </form>

                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default Login;