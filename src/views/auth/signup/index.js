import React, {Component} from 'react';
import './signUp.css';
import {Button, TextField} from "@material-ui/core";
import facebook from "../../../assets/fb.png";

export default class SignUpComponent extends Component {
    render() {
        return <div className={'container'}>
            <div className={'formContainer'}>
                <h1 className={'title'}>AfterWork</h1>
                <p style={{color: "#9d9d9d", fontWeight: 'bold', margin: "5%"}}>Sign up to see your co-workers posts</p>
                <Button variant="contained" color="primary" style={{
                    width: '80%', backgroundColor: '#3897f0', margin: 10,
                    fontWeight: 'bold'
                }}>
                    <img src={facebook} style={{
                        width: 20,
                        height: 20,
                        marginRight: 10
                    }}/> Sign up with Facebook
                </Button>
                <div className={'orCont'}>
                    <div className={'line'}/>
                    <p style={{color: "#b3b3b3", fontWeight: 'bold', margin: "5%"}}>OR</p>
                    <div className={'line'}/>
                </div>

                <TextField
                    id="outlined-dense"
                    label="Email address"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                />
                <TextField
                    id="outlined-dense"
                    label="Full Name"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                />
                <TextField
                    id="outlined-dense"
                    label="Username"
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
                <Button variant="contained" color="primary"
                        style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold', margin: 10}}>
                    Sign Up
                </Button>
                <p style={{color: "#9d9d9d", fontWeight: 'bold', width:'70%'}}>By signing up, you agree to our Terms,
                    Data Policy and Cookies Policy</p>
            </div>
            <div className={'signUpCont'}>
                <p>You have an account ?</p>
                <Button href={'/login'} style={{fontWeight: 'bold', color: '#3897f0'}}>
                    Sign In !
                </Button>
            </div>
        </div>
    }
};
