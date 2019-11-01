import React, {useEffect} from 'react';
import './App.css';
import 'firebase/auth';
import {HeaderComponent} from "./components";
import {Router} from "@reach/router";
import {LoginComponent, SignUpComponent, ResetPasswordComponent} from "./views/auth";
import {FeedComponent,NotFoundComponent} from "./views/home";
import {PersonalProfileCompenent,UserProfileCompenent} from './views/profile';

function AppContainer(props) {
    return (
        <Router>
            <FeedComponent path={'/'}/>
            <LoginComponent path={'login'}/>
            <ResetPasswordComponent path={'resetpassword'}/>
            <SignUpComponent path={'/signup'}/>
            <PersonalProfileCompenent path={'/profile'}/>
            <UserProfileCompenent path={'/:username'}/>
            <NotFoundComponent path={'/404'}/>
        </Router>
    );
}

function App() {
    return (
        <div>
            <HeaderComponent/>
            <AppContainer/>
        </div>
    );
}

export default App;
