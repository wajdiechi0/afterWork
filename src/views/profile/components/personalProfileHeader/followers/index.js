import React, {Component} from 'react';
import './followers.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Avatar from './../../../../../assets/wajdi.jpg';

const Followers = [{avatar: Avatar, name: 'wajdi echi', following: false},
    {avatar: Avatar, name: 'wajdi echi', following: false},
    {avatar: Avatar, name: 'wajdi echi', following: false},
    {avatar: Avatar, name: '1 23', following: true},
    {avatar: Avatar, name: '123123 312312', following: true},
    {avatar: Avatar, name: '123123 31', following: false},
    {avatar: Avatar, name: '12 132312132', following: true},
    {avatar: Avatar, name: '32312132 312213312', following: true},
    {avatar: Avatar, name: '312312 121212', following: false},
    {avatar: Avatar, name: '123321 132123', following: true},
    {avatar: Avatar, name: '12321123 132213', following: true},
    {avatar: Avatar, name: '321213321 132132123', following: true},
    {avatar: Avatar, name: '123123 3231', following: false},
    {avatar: Avatar, name: '321 123', following: true},
    {avatar: Avatar, name: '123 31312123', following: true},
    {avatar: Avatar, name: '123312 321123', following: false},
    {avatar: Avatar, name: '3221 32123132', following: true},
    {avatar: Avatar, name: '1233 313123', following: true},
    {avatar: Avatar, name: '12323 12312321', following: false}
]

export default function FollowersComponent(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
                        Followers.map((item, index) => (
                            <div className={'singleF'}>
                                <img src={item.avatar} height={40} width={40} style={{borderRadius: 20}}/>
                                <p className={'fName'}>{item.name}</p>
                                {
                                    (item.following) ? <Button variant="contained" color="primary"
                                                               style={{
                                                                   backgroundColor: '#3897f0',
                                                                   fontWeight: 'bold'
                                                               }}>Following
                                    </Button> : <Button variant="outlined"
                                                        style={{fontWeight: 'bold'}}>Follow
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
