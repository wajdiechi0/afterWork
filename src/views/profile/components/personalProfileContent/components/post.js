import React, {Component, useEffect, useState} from 'react';
import './post.css';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import {Button, TextField} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Firebase from './../../../../../services/firebase';
import Favorite from '@material-ui/icons/Favorite';

export default function PostComponent(props) {
    const [name, changeName] = useState(localStorage.getItem('name'));
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    let likesN = 0;
    if (props.likes[0] !== '') likesN = props.likes.length;

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
                    <img src={props.image} className={'imagePopup'} style={{display:props.image?'block':'none'}}/>
                    <div className={'verticalLine'} style={{display:props.image?'block':'none'}}/>
                    <div className={'subInfo'}>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <img src={localStorage.getItem('profilePic')} width={50} height={50} style={{borderRadius: 25,marginRight:5}}/>
                            <h5>{localStorage.getItem('name')}</h5>
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
