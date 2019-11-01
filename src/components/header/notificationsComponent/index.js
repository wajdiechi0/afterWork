import React, {useEffect, useState} from 'react';
import './notifications.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Firebase from './../../../services/firebase';

const firestore = Firebase.firestore();
const storage = Firebase.storage();
const fireAuth = Firebase.auth();
export default function NotificationsComponent(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [notifications, addNot] = useState([]);
    const [defaultPic, changeDefaultPic] = useState('');

    try {

        storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
            changeDefaultPic(url);
        });
    } catch (e) {
        console.log(e)
    }

    useEffect(() => {
        fireAuth.onAuthStateChanged(user => {
            if (user)
                firestore.collection('Notifications').orderBy('date', 'desc').get().then(data => {
                    let newNots = [];
                    data.docs.map(not => {
                        if (localStorage.getItem('username') === not.data().to)
                            newNots = [...newNots, not.data()]
                    });
                    addNot(newNots)
                })
        })

    });

    return <div>
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.close}
        >
            <div className={'nContainer'}>
                <div className={'dialogTitle'}>
                    <h3 style={{marginLeft: 'auto'}}>
                        Notifications
                    </h3>
                    <IconButton style={{marginLeft: 'auto'}} onClick={props.close}>
                        <Close/>
                    </IconButton>
                </div>
                <div style={{backgroundColor: '#9d9d9d', width: '100%', height: 0.7, opacity: 0.5}}/>
                <div className={'notiCont'}>
                    {
                        notifications.map((item, index) => (
                            <div className={'singleN'}>
                                <IconButton href={'/' + item.from}>
                                    <img src={item.profileImg !== 'undefined' ? item.profileImg : defaultPic}
                                         height={40} width={40} style={{borderRadius: 20}}/>
                                </IconButton>
                                <div className={'namdAndDesc'}>
                                    <span style={{fontWeight: 600, marginBottom: 3}}>{item.desc}</span>
                                    <span style={{fontWeight: 200}}>{item.date}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Dialog>
    </div>

}
