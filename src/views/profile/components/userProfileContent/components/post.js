import React, {useState, useEffect} from 'react';
import './post.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import Firebase from "../../../../../services/firebase";

const fireStore = Firebase.firestore();
const storage = Firebase.storage();

export default function PostComponent(props) {
    const [name, changeName] = useState(localStorage.getItem(''));
    const [profilePic, changePic] = useState(localStorage.getItem(''));
    const [defaultPic, changeDefaultPic] = useState(localStorage.getItem(''));
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    let likesN = 0;
    if (props.likes[0] !== '') likesN = props.likes.length;

    useEffect(() => {
        fireStore.collection('Users').doc(props.user).get().then(user => {
            changeName(user.data().name);
            changePic(user.data().defaultProfilePic);
        }).then(() => {
            try {

                storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
                    changeDefaultPic(url)
                });
            } catch (e) {
                console.log(e)
            }
        })
    });

    return <div>
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.close}
        >
            <div className={'pContainer'}>
                <div className={'dialogTitle'}>
                    <IconButton style={{marginLeft: 'auto'}} onClick={() => {
                        props.close();
                    }}>
                        <Close/>
                    </IconButton>
                </div>
                <div className={'postInfoCont'}>
                    <img src={props.image} className={'imagePopup'} style={{display: props.image ? 'block' : 'none'}}/>
                    <div className={'verticalLine'} style={{display: props.image ? 'block' : 'none'}}/>
                    <div className={'subInfo'}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <img src={profilePic ? profilePic : defaultPic} width={50} height={50}
                                 style={{borderRadius: 25, marginRight: 5}}/>
                            <h5>{name}</h5>
                        </div>
                        <span style={{textAlign: 'center', height: '90%'}}>{props.desc}</span>
                        <div className={'likesComments'}>
                            <Favorite/>
                            <h4>{likesN}</h4>
                        </div>
                    </div>
                </div>


            </div>
        </Dialog>
    </div>
}
