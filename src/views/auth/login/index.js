import React, {Component} from 'react';
import './login.css';
import {TextField, Button} from '@material-ui/core'
import facebook from './../../../assets/fb.png';

export default class LoginComponent extends Component {
    render() {
        return <div className={'container'}>
            <div className={'formContainer'}>
                <h1 className={'title'}>AfterWork</h1>
                <TextField
                    id="outlined-dense"
                    label="Email address"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}

                />
                <Button href={'/resetpassword'} style={{fontWeight: 'bold', color: '#3897f0'}}> Forgot Password
                    ?</Button>
                <Button variant="contained" color="primary"
                        style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold'}}>
                    Sign In
                </Button>
                <div className={'orCont'}>
                    <div className={'line'}/>
                    <p style={{color: "#b3b3b3", fontWeight: 'bold', margin: "5%"}}>OR</p>
                    <div className={'line'}/>
                </div>
                <Button href={''} style={{fontWeight: 'bold', color: '#3897f0'}}> <img src={facebook} style={{
                    width: 20,
                    height: 20,
                    marginRight: 10
                }}/> Log In With Facebook</Button>
            </div>
            <div className={'signUpCont'}>
                <p>Don't have an account ?</p>
                <Button href={'/signup'} style={{fontWeight: 'bold', color: '#3897f0'}}>
                    Sign Up !
                </Button>
            </div>
        </div>
    }
};
