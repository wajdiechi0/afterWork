import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FooterComponent, HeaderComponent} from "./components";
import {Router, Redirect, Link} from "@reach/router";
import {LoginComponent} from "./views/auth";
import {FeedComponent} from "./views/home";

function AppContainer() {
    return (
        <Router>
            <FeedComponent path={'/'}/>
            <LoginComponent path={'login'}/>
        </Router>
    );
}

function App() {
    return (
        <div>
            <HeaderComponent/>
            <AppContainer/>
            <FooterComponent/>
        </div>
    );
}

export default App;
