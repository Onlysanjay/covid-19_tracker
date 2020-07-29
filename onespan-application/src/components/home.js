import React, { Component } from 'react';
import './home.css';
class Home extends Component {

    constructor() {
        super();
        this.state = {
            "name": 'Admin',
            "password": 'Admin'
        }
        this.nameRef = React.createRef();
        this.passwordRef = React.createRef();


    }
    login = (e) => {
        if (this.nameRef.current.value == "Admin" && this.passwordRef.current.value) {

            localStorage.setItem('username', this.nameRef.current.value);
            localStorage.setItem('password', this.passwordRef.current.value);
            this.props.history.push('/login');

        }

        else
            alert("Invalid Username or Password");
    }
    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <h3>ONE SPAN SIGN APPLICATION</h3>
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <strong>Login Here</strong>
                        </div>
                    </div>

                    <form>
                        <div className="row">
                            <div className="col-md-1">
                                <label>Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">

                                    <input type="text" className="form-control" name="username" ref={this.nameRef} autoComplete="off" />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <label>Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">

                                    <input type="password" name="password" className="form-control" ref={this.passwordRef} autoComplete="off" />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="btn-group">
                                <button className="btn btn-success btn-sm" type="button" onClick={this.login}>Login</button>
                            </div>

                        </div>
                    </form>
                </div>

            </React.Fragment>




        )
    }
}
export default Home;

