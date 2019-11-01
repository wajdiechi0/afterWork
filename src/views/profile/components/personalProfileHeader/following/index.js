import React, {Component, useEffect, useState} from 'react';
import './following.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Firebase from './../../../../../services/firebase';

const firestore = Firebase.firestore();
const storage = Firebase.storage();
export default function FollowingComponent(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [following, addFollowing] = useState([]);
    const [defaultPic, changePic] = useState('');

    useEffect(() => {

        firestore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
            currentUser.data().following.map(userID => {
                let followingID = [];
                following.forEach(item => {
                    followingID = [...followingID, item.id]
                });
                if (!followingID.includes(userID))
                firestore.collection('Users').doc(userID).get().then(user => {
                    if (currentUser.data().following.length > following.length) {
                        addFollowing([...following, user]);
                    }
                })
            })
        })
    });
    try {
        storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
            changePic(url);
        });
    }catch (e) {
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
                    const newTable = following.filter((follow) => {
                        return follow !== item
                    });
                    addFollowing(newTable);
                })
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
                        Following
                    </h3>
                    <IconButton style={{marginLeft: 'auto'}} onClick={props.close}>
                        <Close/>
                    </IconButton>
                </div>
                <div style={{backgroundColor: '#9d9d9d', width: '100%', height: 0.7, opacity: 0.5}}/>
                <div className={'followingCont'}>
                    {
                        following.map((item, index) => (
                            <div className={'singleF'}>
                                <IconButton href={'/'+item.data().username}>
                                <img
                                    src={item.data().defaultProfilePic ? item.data().defaultProfilePic : defaultPic}
                                    height={40} width={40} style={{borderRadius: 20}}/>
                                </IconButton>
                                <p className={'fName'}>{item.data().name}</p>
                                <Button variant="outlined" style={{fontWeight: 'bold'}}
                                        onClick={() => {
                                            unfollow(item);
                                        }}>
                                    Following
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Dialog>
    </div>

}
