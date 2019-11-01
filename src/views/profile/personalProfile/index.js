import React, {Component} from 'react';
import './personalProfile.css';
import {PersonalProfileHeader, PersonalProfileContent} from './../components';
import Firebase from './../../../services/firebase';
import {navigate} from "@reach/router";

const fireAuth = Firebase.auth();
export default class PersonalProfileCompenent extends Component {
    render() {
        return <div
            style={{backgroundColor: '#eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <PersonalProfileHeader/>
            <PersonalProfileContent/>
        </div>
    }

    componentDidMount() {
        fireAuth.onAuthStateChanged((user) => {
            if (!user)
                navigate('/login');
        })
    };
};
