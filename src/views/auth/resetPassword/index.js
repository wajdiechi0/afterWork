import React, {Component} from 'react';
import './resetPassword.css';
import {Button, TextField} from "@material-ui/core";
import Lock from "@material-ui/icons/Lock"
import Alert from "../components/alert";
import Firebase from './../../../services/firebase';

const fireAuth= Firebase.auth();
export default class ResetPasswordComponent extends Component {
    sendResetLink =()=>{
        fireAuth.sendPasswordResetEmail(this.state.email).then(user=>{
            this.setState({
                success: true,
                openAlert:true
            })
        }).catch(e=>{
            this.setState({
                openAlert:true,
                success:false
            })
        })
    };

    state={
        email:'',
        disabled: true,
        openAlert: false,
        success: false
    };

    handleClose =()=>{
      this.setState({
          openAlert:false
      })
    };
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
                    type={'email'}
                    onChange={(e)=>{
                        this.setState(
                            {
                                email: e.target.value
                            }
                        );
                        if(e.target.value==='')
                            this.setState({
                                disabled: true
                            });
                        else this.setState({
                            disabled: false
                        })
                    }}
                />
                <Button variant="contained" color="primary"
                        disabled={this.state.disabled}
                        style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold', margin: 10}} onClick={this.sendResetLink}>
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
            <Alert open={this.state.openAlert} close={this.handleClose} success={this.state.success}/>
        </div>
    }
};
