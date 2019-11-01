import React, {Component} from 'react';
import './imagePost.css';
import Comment from '@material-ui/icons/Comment';
import Favorite from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core';
import PostComponent from './post'
export default class ImagePost extends Component {
    constructor(props) {
        super(props);
    }
    state={
        open:false
    };

    closePost = () => {
        this.setState({
            open:false
        })
    };
    render() {
        let likesN=0;
        if(this.props.likes[0]!=='') likesN = this.props.likes.length;
        return (
            <div>
            <IconButton onClick={()=>{this.setState({open:true})}}>
                <div className={'singleImage'}>
                    <div style={{display: this.props.image ? 'none' : 'block'}}>
                        <div className={'textCont'}>
                            <span className={'textStyleP'}>{this.props.desc}</span>
                        </div>
                    </div>
                    <img src={this.props.image} className={'singleImage'}/>
                    <div className={'imgHover'}>
                        <IconButton disabled={true}>
                            <Favorite/>
                        </IconButton>
                        <h4>{likesN}</h4>
                    </div>
                </div>
            </IconButton>
                <PostComponent user={this.props.user} open={this.state.open} image={this.props.image} desc={this.props.desc} close={this.closePost} likes={this.props.likes} />
            </div>
        );
    }



};
