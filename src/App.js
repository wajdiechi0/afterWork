import React from 'react';
import './App.css';
import {FooterComponent, HeaderComponent} from "./components";
import {Router} from "@reach/router";
import {LoginComponent, SignUpComponent, ResetPasswordComponent} from "./views/auth";
import {FeedComponent, DiscoverComponent} from "./views/home";
import {SettingsComponent, PersonalProfileCompenent, FollowersComponent, FollowingComponent} from './views/profile';


function AppContainer() {
    return (
        <Router>
            <FeedComponent path={'/'}/>
            <LoginComponent path={'login'}/>
            <SettingsComponent path={'/settings'}/>
            <ResetPasswordComponent path={'resetpassword'}/>
            <SignUpComponent path={'/signup'}/>
            <PersonalProfileCompenent path={'/profile'}/>
            <FollowingComponent path={'/profile/following'}/>
            <FollowersComponent path={'/profile/followers'}/>
            <DiscoverComponent path={'/discover'}/>
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
