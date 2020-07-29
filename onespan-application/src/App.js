import React from 'react';
import logo from './logo.svg';
import Home from './components/home.js'
import Login from './components/Login.js'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className="App">
<Router>
<React.Fragment>
<Route exact path="/" component={Home} />
<Route path="/login" component={Login}/>
</React.Fragment>
</Router>
    </div>
  );
}

export default App;
