import React, {Component} from 'react';
import './personalProfileHeader.css';
import {Button, IconButton} from '@material-ui/core';
import FollowingComponent from './following';
import FollowersComponent from './followers';
import SettingsComponent from './settings';
import Firebase from './../../../../services/firebase';
import {Link} from "@reach/router";
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
const fireAuth =  Firebase.auth();
const firestore =  Firebase.firestore();

export default class PersonalProfileHeader extends Component {
    state = {
        openFollowers: false,
        openFollowing: false,
        openSettings: false,
        username: '',
        name: '',
        email:'',
        followingN: '',
        followersN: '',
        postsN: '',
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

    refreshPage = () => {
        this.setState({
            username:localStorage.getItem('username'),
            name:localStorage.getItem('name'),
            email:localStorage.getItem('email'),
            postsN: localStorage.getItem('postsN'),
            followersN: localStorage.getItem('followersN'),
            followingN: localStorage.getItem('followingN')
        })

    };

    componentDidMount() {
        firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(user=>{
            this.setState({
                username:user.data().username,
                name:user.data().name,
                email:user.data().email,
                postsN: user.data().postsN,
                followersN: user.data().followersN,
                followingN: user.data().followingN
            });
        })
    }

    render() {
        return <div className={'profileHeaderContainer'} style={{width:'100%',display:"flex",justifyContent:'center'}}>
            <div className={'profileImageContainer'}>
                <img src={localStorage.getItem('profilePic')} className="profileImageContent"/>
            </div>
            <div className={'infoCont'}>
                <div className={'subInfoCont'}>
                    <h4 className={'textStylePH'}>{this.state.username}</h4>
                    <Button variant="outlined" className={'editButton'} onClick={() => {
                        this.setState({openSettings: true})
                    }}>
                        Edit Profile
                    </Button>
                    <Link to={'/login'}>
                        <IconButton onClick={() => {
                            fireAuth.signOut().then(()=>{
                                window.location.reload();
                            });
                        }}>
                            <PowerSettingsNew/>
                        </IconButton>
                    </Link>
                </div>
                <div className={'subInfoCont'}>
                    <h4 className={'stats'}>{this.state.postsN} posts</h4>
                    <Button onClick={() => {
                        this.setState({openFollowers: true})
                    }}>
                        <span className={'stats'}>{this.state.followersN} followers</span>

                    </Button>
                    <Button onClick={() => {
                        this.setState({openFollowing: true})
                    }}>
                        <span className={'stats'}> {this.state.followingN} following</span>

                    </Button>
                </div>
                <div className={'subInfoCont'}>
                    <h4 className={'textStylePH'}>{this.state.name} </h4>
                </div>
            </div>
            <FollowersComponent open={this.state.openFollowers} close={this.handleCloseFollowers}/>
            <FollowingComponent open={this.state.openFollowing} close={this.handleCloseFollowing}/>
            <SettingsComponent open={this.state.openSettings} close={this.handleCloseSettings} refreshPage={this.refreshPage}/>
        </div>

    }
};
