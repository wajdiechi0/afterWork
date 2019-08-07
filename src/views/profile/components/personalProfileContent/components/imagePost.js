import React, {Component} from 'react';
import './imagePost.css';
import Comment from '@material-ui/icons/Comment';
import Favorite from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';

export default class ImagePost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'singleImage'}>
                <img src={this.props.image} className={'singleImage'}/>
                <div className={'imgHover'}>
                    <IconButton  href={'Comments'} >
                        <Comment />
                    </IconButton>
                    <h4>3</h4>
                    <IconButton href={'Likes'} >
                        <Favorite/>
                    </IconButton>
                    <h4>5</h4>

                </div>
            </div>
        );
    }
};
