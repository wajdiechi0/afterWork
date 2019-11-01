import React, {Component} from 'react';
import './signUp.css';
import {Button, TextField} from "@material-ui/core";
import facebook from "../../../assets/fb.png";
import Firebase from './../../../services/firebase';
import Alert from './../components/alert'
import {navigate} from '@reach/router';

const fireAuth = Firebase.auth();
const fireStore = Firebase.firestore();

const fbProvider = new Firebase.auth.FacebookAuthProvider();
export default class SignUpComponent extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        username: '',
        openAlert: false
    };

    signUpFb = async () => {
        try {
            const result = await fireAuth.signInWithPopup(fbProvider).then(
                ({user}) => {
                    fireStore.collection('Users').doc(user.uid).set({
                        email: user.email,
                        name: user.displayName,
                        username: user.uid,
                        postsN:0,
                        followersN:0,
                        followingN:0,
                        following:[],
                        followers:[]
                    });
                    localStorage.setItem('userID', user.uid);
                    localStorage.setItem('name', user.displayName);
                    localStorage.setItem('username', user.uid);
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('postsN', 0);
                    localStorage.setItem('followersN', 0);
                    localStorage.setItem('followingN', 0);
                });
        } catch (e) {
            console.log(e);
        }
    };

    signUpForm = async () => {
        if (this.state.name == '' || this.state.username == '') {
            this.setState({
                openAlert: true
            });
            return false;
        }
        try {
            const result = await fireAuth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(
                ({user}) => {
                    fireStore.collection('Users').doc(user.uid).set({
                        email: user.email,
                        name: this.state.name,
                        username: this.state.username,
                        postsN:0,
                        followersN:0,
                        followingN:0,
                        following:[],
                        followers:[]
                    });
                    localStorage.setItem('userID', user.uid);
                    localStorage.setItem('name', this.state.name);
                    localStorage.setItem('username', this.state.username);
                    localStorage.setItem('email', this.state.email);
                    localStorage.setItem('postsN', 0);
                    localStorage.setItem('followersN', 0);
                    localStorage.setItem('followingN', 0);
                    navigate('/profile');
                });
        } catch (e) {
            console.log(e);
            this.setState({
                openAlert: true
            })
        }
    };

    handleClose = () => {
        this.setState({
            openAlert: false
        })
    };

    render() {
        return <div className={'SignUpcontainer'}>
            <div className={'formContainer'}>
                <h1 className={'title'}>AfterWork</h1>
                <p style={{color: "#9d9d9d", fontWeight: 'bold', margin: "5%"}}>Sign up to see your co-workers posts</p>
                <Button variant="contained" color="primary" onClick={this.signUpFb} style={{
                    width: '80%', backgroundColor: '#3897f0', margin: 10,
                    fontWeight: 'bold'
                }}
                >
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
                    type={'email'}
                    onChange={(e) => {
                        this.setState({email: e.target.value})
                    }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                    onChange={(e) => {
                        this.setState({password: e.target.value})
                    }}
                />
                <TextField
                    id="outlined-dense"
                    label="Full Name"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                    onChange={(e) => {
                        this.setState({name: e.target.value})
                    }}
                />
                <TextField
                    id="outlined-dense"
                    label="Username"
                    variant="outlined"
                    margin={'dense'}
                    className={'input'}
                    onChange={(e) => {
                        this.setState({username: e.target.value})
                    }}
                />
                <Button variant="contained" color="primary"
                        onClick={this.signUpForm}
                        style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold', margin: 10}}>
                    Sign Up
                </Button>
                <p style={{color: "#9d9d9d", fontWeight: 'bold', width: '70%'}}>By signing up, you agree to our Terms,
                    Data Policy and Cookies Policy</p>
            </div>
            <div className={'signInCont'}>
                <p>You have an account ?</p>
                <Button href={'/login'} style={{fontWeight: 'bold', color: '#3897f0'}}>
                    Sign In !
                </Button>
            </div>
            <Alert open={this.state.openAlert} close={this.handleClose}/>
        </div>
    }

    componentDidMount() {
        fireAuth.onAuthStateChanged((user) => {
            if (user)
                navigate('/');
        })
    };

};
