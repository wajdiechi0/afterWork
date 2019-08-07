import React, {Component} from 'react';
import './createPostComponent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {TextField, Input} from '@material-ui/core/';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Send from '@material-ui/icons/Send';
import Avatar from './../../../../assets/wajdi.jpg'
import ReactFileReader from 'react-file-reader';

export default class CreatePostComponent extends Component {
    post = () => {
        console.log('asd');
    }
    state = {
        uploaded: false,
        imagePost: ''
    }
    handleFiles = (images) => {
        let reader = new FileReader()
        reader.readAsDataURL(images[0])
        reader.onload = () => {
            this.setState({
                imagePost: reader.result,
                uploaded: true
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    render() {
        return (

            <Card className={'cardC'}>
                <CardHeader
                    avatar={
                        <img src={Avatar} width={60} height={60} style={{borderRadius: 30}}/>
                    }
                    className={'cardHeaderCreateP'}
                    title=<h3 style={{fontFamily: 'ArtBrush'}}>Create a post</h3>
                />
                <CardContent>
                    <TextField
                        style={{width: '100%'}}
                        id="outlined-textarea"
                        placeholder="Type here..."
                        multiline
                        rowsMax={3}
                        variant="outlined"
                    />
                </CardContent>
                <CardMedia
                    style={{
                        display: this.state.uploaded ? 'block' : "none",
                    }}
                    className={'imageStyleC'}
                    image={this.state.uploaded ? this.state.imagePost : ''}
                />
                <CardActions className={'cardActionsCreateP'}>
                    <IconButton aria-label="select an image">
                        <ReactFileReader handleFiles={this.handleFiles}>
                            <AddAPhoto/>
                        </ReactFileReader>

                    </IconButton>

                    <IconButton
                        onClick={this.post}
                        aria-label="post"
                    >
                        <Send/>
                    </IconButton>
                </CardActions>

            </Card>

        )
    }
}
