import React, {Component} from 'react';
import './settings.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import {Button, TextField} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Avatar from './../../../../../assets/wajdi.jpg';

export default function SettingComponent(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
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
                    <img src={Avatar} height={60} width={60} style={{borderRadius: 30, margin: 10}}/>
                    <Button onClick={() => {
                    }}>
                        <span className={'stats'}>Change photo</span>

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
                    />
                </div>
                <div className={'simpleSet'}>
                    <span className={'setForm'}>User Name</span>
                    <TextField
                        id="outlined-dense"
                        label={'User Name'}
                        margin="dense"
                        variant="outlined"
                        required={true}
                        InputLabelProps={{style: {fontSize: '.9em'}}}
                        inputProps={{style: {fontSize: '.9em'}}}
                        style={{marginRight: 50, marginLeft: '10px', width: '60%'}}
                    />
                </div>
                <div className={'simpleSet'}>
                    <span className={'setForm'}>Bio</span>
                    <TextField
                        id="outlined-dense"
                        margin="dense"
                        label={'Bio'}
                        variant="outlined"
                        multiline
                        rows={3}
                        InputLabelProps={{style: {fontSize: '.9em'}}}
                        inputProps={{style: {fontSize: '.9em'}}}
                        style={{marginRight: 50, marginLeft: '10px', width: '60%'}}
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
                    />
                </div>
                <div className={'simpleSet'}>
                    <Button onClick={props.close} variant={"contained"} color={"primary"} style={{
                        backgroundColor: '#3897f0',
                        fontWeight: 'bold',
                        marginLeft: 'auto',
                        marginRight: '50px',
                        marginTop:'10px'

                    }}>
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>

}
