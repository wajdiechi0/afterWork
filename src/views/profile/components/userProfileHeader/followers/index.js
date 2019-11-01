import React, {Component, useEffect, useState} from 'react';
import './followers.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Firebase from './../../../../../services/firebase';

const firestore = Firebase.firestore();
const storage = Firebase.storage();
const fireAuth = Firebase.auth();

export default function FollowersComponent(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [followers, addFollowers] = useState([]);
    const [defaultPic, changePic] = useState('');
    const [followCheck, changeFollowCheck] = useState([]);
    const [reload, changeReload] = useState(Date());

    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            if (user)
                firestore.collection('Users').get().then(users => {
                    users.docs.forEach(user => {
                        if (user.data().username === props.username) {
                            const userIDs = user.id;
                            firestore.collection('Users').doc(userIDs).get().then(currentUser => {
                                currentUser.data().followers.forEach(userID => {
                                    let followersID = [];
                                    followers.forEach(item => {
                                        followersID = [...followersID, item.id]
                                    });
                                    if (!followersID.includes(userID))
                                        firestore.collection('Users').doc(userID).get().then(user => {
                                            firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(personalUser => {
                                                followCheck[userID] = personalUser.data().following.includes(userID);
                                            });
                                            changeFollowCheck(followCheck);
                                            if (currentUser.data().followers.length > followers.length) {
                                                addFollowers([...followers, user]);
                                            }
                                        })
                                })
                            })
                        }
                    });
                });
        });
    });
    try {
        storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
            changePic(url);
        });
    } catch (e) {
        console.log(e)
    }

    const unfollow = (item) => {
        const newFollowers = item.data().followers.filter(follow => {
            return follow !== localStorage.getItem('userID')
        });
        firestore.collection('Users').doc(item.id).update({
            followers: newFollowers,
            followersN: item.data().followersN - 1
        });
        firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
            const newFollowing = currentUser.data().following.filter(follow => {
                return follow !== item.id
            });
            if (newFollowing.length < currentUser.data().following.length)
                firestore.collection('Users').doc(localStorage.getItem('userID')).update({
                    following: newFollowing,
                    followingN: currentUser.data().followingN - 1
                }).then(() => {
                    const newFollowCheck = followCheck;
                    newFollowCheck[item.id] = false;
                    changeReload(Date());
                    changeFollowCheck(newFollowCheck);
                })
        })
    };

    const follow = (item) => {
        firestore.collection('Users').doc(item.id).update({
            followers: [...item.data().followers, localStorage.getItem('userID')],
            followersN: item.data().followersN + 1
        });
        firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
            firestore.collection('Users').doc(localStorage.getItem('userID')).update({
                following: [...currentUser.data().following, item.id],
                followingN: currentUser.data().followingN + 1
            })
        }).then(() => {
            const newFollowCheck = followCheck;
            newFollowCheck[item.id] = true;
            changeReload(Date());
            changeFollowCheck(newFollowCheck);

        })
    };
    return <div>
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.close}
        >
            <div className={'fContainer'}>
                <div className={'dialogTitle'}>
                    <h3 style={{marginLeft: 'auto'}}>
                        Followers
                    </h3>
                    <IconButton style={{marginLeft: 'auto'}} onClick={props.close}>
                        <Close/>
                    </IconButton>
                </div>
                <div style={{backgroundColor: '#9d9d9d', width: '100%', height: 0.7, opacity: 0.5}}/>
                <div className={'followersCont'}>
                    {
                        followers.map((item, index) => (
                            <div className={'singleF'}>
                                <IconButton href={'/' + item.data().username}>
                                    <img
                                        src={item.data().defaultProfilePic ? item.data().defaultProfilePic : defaultPic}
                                        height={40} width={40} style={{borderRadius: 20}}/>
                                </IconButton>
                                <p className={'fName'}>{item.data().name}</p>
                                {
                                    (!followCheck[item.id]) ?
                                        <Button variant="contained" color="primary"
                                                onClick={() => {
                                                    follow(item);
                                                }}
                                                style={{
                                                    backgroundColor: '#3897f0',
                                                    fontWeight: 'bold'
                                                }}>Follow
                                        </Button> : <Button variant="outlined"
                                                            onClick={() => unfollow(item)}
                                                            style={{fontWeight: 'bold'}}>Following
                                        </Button>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Dialog>
    </div>

}
