import React, {Component, useState} from 'react';
import './settings.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import {Button, TextField} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Firebase from './../../../../../services/firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const fireStore = Firebase.firestore();
const fireAuth = Firebase.auth();
const storage = Firebase.storage();

export default function SettingComponent(props) {
    const [name, changeName] = useState(localStorage.getItem('name'));
    const [email, changeEmail] = useState(localStorage.getItem('email'));
    const [username, changeUsername] = useState(localStorage.getItem('username'));
    const [profilePic, changeProfilePic] = useState(localStorage.getItem('profilePic'));
    const [loading, startLoading] = useState('none');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const changeData = () => {
        fireAuth.currentUser.updateEmail(email);
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        fireStore.collection('Users').doc(localStorage.getItem('userID')).update({
            name: name,
            email: email,
            username: username
        });
        localStorage.setItem('profilePic', localStorage.getItem('profilePic2'))
        fireStore.collection('Users').doc(localStorage.getItem('userID')).update({
            defaultProfilePic: localStorage.getItem('profilePic')
        });
        props.close();
        props.refreshPage();
    };

    const handlePic = (filename) => {
        storage.ref('profilePic').child(filename).getDownloadURL().then(url => {
            changeProfilePic(url);
            localStorage.setItem('profilePic2', url)
        });
        startLoading('none');
    };

    const handleUploadStart = () => {
        startLoading('block');
    };
    return <div>
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.close}
        >
            <div className={'sContainer'}>
                <div className={'dialogTitle'}>
                    <h3 style={{marginLeft: 'auto'}}>
                        Settings
                    </h3>
                    <IconButton style={{marginLeft: 'auto'}} onClick={props.close}>
                        <Close/>
                    </IconButton>
                </div>
                <div style={{backgroundColor: '#9d9d9d', width: '100%', height: 0.7, opacity: 0.5}}/>
                <div className={'settingsTitle'}>
                    <div style={{position: 'relative'}}>
                        <img src={profilePic} height={60} width={60}
                             style={{borderRadius: 30, margin: 10}}/>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: 10,
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            backgroundColor: 'black',
                            opacity: 0.5,
                            display: loading
                        }}/>
                        <CircularProgress
                            style={{height: 20, width: 20,color:"white", position: 'absolute', top: 30, left: 30, display: loading}}/>
                    </div>
                    <Button>
                        <CustomUploadButton
                            accept="image/*"
                            name="avatar"
                            storageRef={Firebase.storage().ref("profilePic")}
                            randomizeFilename
                            onUploadSuccess={handlePic}
                            onUploadStart={handleUploadStart}
                        >
                            <span className={'stats'}>
                                Change photo
                            </span>
                        </CustomUploadButton>
                    </Button>

                </div>
                <div className={'simpleSet'}>
                    <span className={'setForm'}>Name</span>
                    <TextField
                        id="outlined-dense"
                        margin="dense"
                        label={'Name'}
                        variant="outlined"
                        InputLabelProps={{style: {fontSize: '.9em'}}}
                        inputProps={{style: {fontSize: '.9em'}}}
                        style={{marginRight: 50, marginLeft: '10px', width: '60%'}}
                        required={true}
                        defaultValue={localStorage.getItem('name')}
                        onChange={(e) => {
                            changeName(e.target.value)
                        }}
                    />
                </div>
                <div className={'simpleSet'}>
                    <span className={'setForm'}>User Name</span>
                    <TextField
                        id="outlined-dense"
                        label={'User Name'}
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{style: {fontSize: '.9em'}}}
                        inputProps={{style: {fontSize: '.9em'}}}
                        style={{marginRight: 50, marginLeft: '10px', width: '60%'}}
                        required={true}
                        defaultValue={localStorage.getItem('username')}
                        onChange={(e) => {
                            changeUsername(e.target.value)
                        }}
                    />
                </div>
                <div className={'simpleSet'}>
                    <span className={'setForm'}>Email</span>
                    <TextField
                        id="outlined-dense"
                        margin="dense"
                        label={'Email'}
                        variant="outlined"
                        InputLabelProps={{style: {fontSize: '.9em'}}}
                        inputProps={{style: {fontSize: '.9em'}}}
                        style={{marginRight: 50, marginLeft: '10px', width: '60%'}}
                        required={true}
                        defaultValue={localStorage.getItem('email')}
                        onChange={(e) => {
                            changeEmail(e.target.value)
                        }}
                    />
                </div>
                <div className={'simpleSet'}>
                    <Button onClick={changeData} variant={"contained"} color={"primary"} style={{
                        backgroundColor: '#3897f0',
                        fontWeight: 'bold',
                        marginLeft: 'auto',
                        marginRight: '50px',
                        marginTop: '10px'

                    }}>
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>

}
