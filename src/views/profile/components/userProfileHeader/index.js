import React, {Component} from 'react';
import './userProfileHeader.css';
import {Button, IconButton} from '@material-ui/core';
import FollowingComponent from './following';
import FollowersComponent from './followers';
import Firebase from './../../../../services/firebase';

const firestore = Firebase.firestore();
const storage = Firebase.storage();
export default class UserProfileHeader extends Component {
    state = {
        openFollowers: false,
        openFollowing: false,
        openSettings: false,
        username: '',
        name: '',
        email: '',
        followingN: '',
        followersN: '',
        postsN: '',
        profilePic: '',
        user: '',
        following: false
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

    refreshPage = () => {
        this.setState({
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            postsN: localStorage.getItem('postsN'),
            followersN: localStorage.getItem('followersN'),
            followingN: localStorage.getItem('followingN')
        })

    };

    componentDidMount() {
        firestore.collection('Users').get().then(users => {
            users.docs.forEach(user => {
                if (user.data().username === this.props.username) {
                    firestore.collection('Users').doc(user.id).get().then(user => {
                        this.setState({
                            username: user.data().username,
                            name: user.data().name,
                            email: user.data().email,
                            postsN: user.data().postsN,
                            followersN: user.data().followersN,
                            followingN: user.data().followingN,
                            profilePic: user.data().defaultProfilePic,
                            user: user.id
                        });
                        try {
                            if (!user.data().defaultProfilePic)
                                storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
                                    this.setState({
                                        profilePic: url
                                    })
                                });
                        }catch (e) {
                            console.log(e)
                        }

                    });
                    if (user.data().followers.includes(localStorage.getItem('userID')))
                        this.setState({
                            following: true
                        })
                }
            })
        });
    }

    follow = () => {
        firestore.collection('Users').get().then(users => {
            users.docs.forEach(user => {
                if (user.data().username === this.props.username) {
                    firestore.collection('Users').doc(user.id).update({
                        followers: [...user.data().followers, localStorage.getItem('userID')],
                        followersN: user.data().followersN + 1
                    }).then(() => {
                        this.setState({
                            following: true
                        });
                        firestore.collection('Notifications').doc(Date.now().toString()).set({
                            to: user.data().username,
                            from : localStorage.getItem('username'),
                            desc: localStorage.getItem('name')+' starts following you',
                            date: Date(),
                            profileImg: localStorage.getItem('profilePic')
                        });
                    });
                    firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
                        firestore.collection('Users').doc(localStorage.getItem('userID')).update({
                            following: [...currentUser.data().following, user.id],
                            followingN: currentUser.data().followingN + 1
                        })
                    })
                }
            })
        });
    };

    unfollow = () => {
        firestore.collection('Users').get().then(users => {
            users.docs.forEach(user => {
                if (user.data().username === this.props.username) {
                    const newFollowers= user.data().followers.filter(item=>{
                        return item !== localStorage.getItem('userID')
                    });
                    firestore.collection('Users').doc(user.id).update({
                        followers: newFollowers,
                        followersN: user.data().followersN - 1
                    }).then(() => {
                        this.setState({
                            following: false
                        })
                    });
                    firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
                        const newFollowing= currentUser.data().following.filter(item=>{
                            return item !== user.id
                        });
                        firestore.collection('Users').doc(localStorage.getItem('userID')).update({
                            following: newFollowing,
                            followingN: currentUser.data().followingN - 1
                        })
                    })
                }
            })
        });
    };

    render() {

        return <div className={'userProfileHeaderContainer'}>
            <div className={'profileImageContainer'}>
                <img src={this.state.profilePic} className="profileImageContent"/>
            </div>
            <div className={'infoCont'}>
                <div className={'subInfoCont'}>
                    <h4 className={'textStylePH'}>{this.state.username}</h4>
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
                {
                    (!this.state.following) ? <Button variant="contained" color="primary" onClick={this.follow}
                                                      style={{
                                                          backgroundColor: '#3897f0',
                                                          fontWeight: 'bold'
                                                      }}>Follow
                    </Button> : <Button variant="outlined" onClick={this.unfollow}
                                        style={{fontWeight: 'bold'}}>Following
                    </Button>
                }
            </div>
            <FollowersComponent open={this.state.openFollowers} close={this.handleCloseFollowers}
                                username={this.props.username}/>
            <FollowingComponent open={this.state.openFollowing} close={this.handleCloseFollowing}
                                username={this.props.username}/>
        </div>

    }
};
