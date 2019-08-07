import React, {Component} from 'react';
import './resetPassword.css';
import {Button, TextField} from "@material-ui/core";
import Lock from "@material-ui/icons/Lock"

export default class ResetPasswordComponent extends Component {
    render() {
        return <div className={'container'}>
            <div className={'formContainer'}>
                <Lock style={{width: 65, height: 65}}/>
                <h3>Trouble While Logging In?</h3>
                <p style={{color: "#9d9d9d", fontWeight: 'bold', margin: "10%"}}>Enter your email and you'll receive a
                    link to reset your password</p>
                <TextField
                    id="outlined-dense"
                    label="Email address"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                />
                <Button variant="contained" color="primary"
                        style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold', margin: 10}}>
                    Send Reset Link
                </Button>
                <div className={'orContR'}>
                    <div className={'line'}/>
                    <p style={{color: "#b3b3b3", fontWeight: 'bold', margin: "5%"}}>OR</p>
                    <div className={'line'}/>
                </div>
                <Button href={'/signup'} style={{fontWeight: 'bold', color: 'black'}}> Create New Account</Button>
                <div className={'backLogin'}>
                    <Button href={'/login'} style={{fontWeight: 'bold', color: '#282828'}}>
                        Back To Login
                    </Button>
                </div>
            </div>
        </div>
    }
};
