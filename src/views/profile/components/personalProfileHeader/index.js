import React, {Component} from 'react';
import './personalProfileHeader.css';
import {Button} from '@material-ui/core';
import Wajdi from './../../../../assets/wajdi.jpg'
import FollowingComponent from './following';
import FollowersComponent from './followers';
import SettingsComponent from './settings';

export default class PersonalProfileHeader extends Component {
    state = {
        openFollowers: false,
        openFollowing: false,
        openSettings: false
    };

    handleCloseFollowers = () => {
        this.setState({
            openFollowers: false
        })
    };

    handleCloseFollowing = () => {
        this.setState({
            openFollowing: false
        })
    };

    handleCloseSettings = () => {
        this.setState({
            openSettings: false
        })
    };

    render() {
        return <div className={'profileHeaderContainer'}>
            <div className={'profileImageContainer'}>
                <img src={Wajdi} className="profileImageContent"/>
            </div>
            <div className={'infoCont'}>
                <div className={'subInfoCont'}>
                    <h4 className={'textStylePH'}>Username</h4>
                    <Button variant="outlined" className={'editButton'} onClick={() => {
                        this.setState({openSettings: true})
                    }}>
                        Edit Profile
                    </Button>
                </div>
                <div className={'subInfoCont'}>
                    <h4 className={'stats'}>15 posts</h4>
                    <Button onClick={() => {
                        this.setState({openFollowers: true})
                    }}>
                        <span className={'stats'}>200 followers</span>

                    </Button>
                    <Button onClick={() => {
                        this.setState({openFollowing: true})
                    }}>
                        <span className={'stats'}> 210 following</span>

                    </Button>
                </div>
                <div className={'subInfoCont'}>
                    <h4 className={'textStylePH'}>Full Name </h4>
                </div>
            </div>
            <FollowersComponent open={this.state.openFollowers} close={this.handleCloseFollowers}/>
            <FollowingComponent open={this.state.openFollowing} close={this.handleCloseFollowing}/>
            <SettingsComponent open={this.state.openSettings} close={this.handleCloseSettings}/>
        </div>

    }
};
