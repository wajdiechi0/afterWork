import React, {useState, useEffect} from 'react';
import './login.css';
import {TextField, Button} from '@material-ui/core'
import facebook from './../../../assets/fb.png';
import Firebase from './../../../services/firebase';
import Alert from './../components/alert'
import {navigate} from "@reach/router";

const fireAuth = Firebase.auth();
const fireStore = Firebase.firestore();
const fbProvider = new Firebase.auth.FacebookAuthProvider();
const storageRef = Firebase.storage();
export default function LoginComponent(props) {
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [open, handleAlert] = useState(false);

    const getInfos = (userID) => {
        fireStore.collection('Users').doc(userID).get().then(user => {
            const infos = user.data();
            localStorage.setItem('userID', userID);
            localStorage.setItem('name', infos.name);
            localStorage.setItem('username', infos.username);
            localStorage.setItem('postsN', infos.postsN);
            localStorage.setItem('followersN', infos.followersN);
            localStorage.setItem('followingN', infos.followingN);
            localStorage.setItem('profilePic', infos.defaultProfilePic);
            try {

                if (!infos.defaultProfilePic) {
                    storageRef.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
                        localStorage.setItem('profilePic', url);
                    })
                }
            } catch (e) {
                console.log(e)
            }
        });
    };

    const signInForm = async () => {
        try {
            const result = await fireAuth.signInWithEmailAndPassword(email, password);
            localStorage.setItem('email', result.user.email);
            getInfos(result.user.uid);
        } catch (e) {
            handleAlert(true);
            console.log(e);
        }
    };

    const signInFb = async () => {
        try {
            const result = await fireAuth.signInWithPopup(fbProvider);
            getInfos(result.user.uid);
            localStorage.setItem('email', result.user.email);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fireAuth.onAuthStateChanged(user => {
            if (user)
                navigate('/');
        });
    });
    return <div className={'container'}>
        <div className={'formContainer'}>
            <h1 className={'title'}>AfterWork</h1>
            <TextField
                id="outlined-dense"
                label="Email address"
                variant="outlined"
                margin={'dense'}
                className={'input'}
                onChange={(e) => changeEmail(e.target.value)}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="outlined"
                margin={'dense'}
                className={'input'}
                onChange={(e) => changePassword(e.target.value)}
            />
            <Button href={'/resetpassword'} style={{fontWeight: 'bold', color: '#3897f0'}}> Forgot Password
                ?</Button>
            <Button variant="contained" color="primary" onClick={signInForm}
                    style={{width: '80%', backgroundColor: '#3897f0', fontWeight: 'bold'}}>
                Sign In
            </Button>
            <div className={'orCont'}>
                <div className={'line'}/>
                <p style={{color: "#b3b3b3", fontWeight: 'bold', margin: "5%"}}>OR</p>
                <div className={'line'}/>
            </div>
            <Button style={{fontWeight: 'bold', color: '#3897f0'}} onClick={signInFb}>
                <img src={facebook}
                     style={{
                         width: 20,
                         height: 20,
                         marginRight: 10
                     }}/> Log In With Facebook
            </Button>
        </div>
        <div className={'signUpCont'}>
            <p>Don't have an account ?</p>
            <Button href={'/signup'} style={{fontWeight: 'bold', color: '#3897f0'}}>
                Sign Up !
            </Button>
        </div>
        <Alert open={open} close={() => {
            handleAlert(false)
        }}/>
    </div>

};
