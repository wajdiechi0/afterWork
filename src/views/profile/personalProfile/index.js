import React, {Component} from 'react';
import './personalProfile.css';
import {PersonalProfileHeader, PersonalProfileContent} from './../components';

export default class PersonalProfileCompenent extends Component {
    render() {
        return <div style={{backgroundColor: '#eaeaea',display:'flex',flexDirection:'column', alignItems:'center'}}>
            <PersonalProfileHeader/>
            <PersonalProfileContent/>
        </div>
    }
};
