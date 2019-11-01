import React, {Component} from 'react';
import './feed.css';
import {CreatePostComponent,PostComponent} from './../components/';
import {navigate} from "@reach/router";
import Firebase from './../../../services/firebase';

const fireAuth = Firebase.auth();
export default class FeedComponent extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return <div style={{backgroundColor:"#eaeaea",minHeight:'100vh'}} align={'center'}>
            <CreatePostComponent/>
            <PostComponent/>
        </div>
    }
    componentDidMount() {
        fireAuth.onAuthStateChanged((user) => {
            if (!user)
                navigate('/login');
        })
    };
};
