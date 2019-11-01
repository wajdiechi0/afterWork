import React, {Component} from 'react';
import './userProfile.css';
import {UserProfileHeader, UserProfileContent} from './../components';
import Firebase from './../../../services/firebase';
import {navigate} from "@reach/router";

const fireAuth = Firebase.auth();
const firestore = Firebase.firestore();
export default class UserProfile extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        show: 'none'
    };

    render() {
        return <div
            style={{backgroundColor: '#eaeaea', alignItems: 'center', display: this.state.show}}>
            <UserProfileHeader username={this.props.username}/>
            <UserProfileContent username={this.props.username}/>
        </div>
    };

    componentDidMount() {
        fireAuth.onAuthStateChanged((user) => {
            if (!user)
                navigate('/login');
            else{
                firestore.collection('Users').get().then(data => {
                    data.docs.forEach(user => {
                        if (user.data().username === this.props.username)
                            this.setState({
                                show: 'block'
                            })
                    });
                    if(this.state.show==='none')
                        navigate('/404')
                    if(this.props.username===localStorage.getItem('username'))
                        navigate('/profile')
                });
            }

        });
    };
};
