import React, {Component} from 'react';
import './feed.css';
import {CreatePostComponent,PostComponent} from './../components/';

export default class FeedComponent extends Component{
    render() {
        return <div style={{backgroundColor:"#eaeaea"}} align={'center'}>
            <CreatePostComponent/>
            <PostComponent/>
        </div>
    }
};
