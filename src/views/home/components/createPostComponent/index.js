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
import ReactFileReader from 'react-file-reader';
import Firebase from "../../../../services/firebase";

const storage = Firebase.storage();
const fireStore = Firebase.firestore();

let image = '';
export default class CreatePostComponent extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    post = () => {
        if (this.state.imagePost === '' && this.state.desc ==='') return;
        if (image !== '') {
            const result = storage.ref('postsImg').child(Date.now() + image.name).put(image).then(data => {
                storage.ref(data.ref.fullPath).getDownloadURL().then(url => {
                    fireStore.collection('Posts').doc(Date.now().toString()).set({
                        date: Date(),
                        desc: this.state.desc,
                        image: url,
                        likes:[],
                        user: localStorage.getItem('userID')
                    }).then(() => {
                        this.setState({
                            imagePost: '',
                            uploaded: false,
                            desc: ''
                        });
                    })
                })
            });
        } else {
            fireStore.collection('Posts').doc(Date.now().toString()).set({
                date: Date(),
                desc: this.state.desc,
                likes:[],
                user: localStorage.getItem('userID')
            }).then(() => {
                this.setState({
                    desc: ''
                });
            });
        };
        fireStore.collection('Users').doc(localStorage.getItem('userID')).get().then(user=>{
            console.log(user.data());
            const postsN = user.data().postsN;
            fireStore.collection('Users').doc(localStorage.getItem('userID')).update({
                postsN: postsN+1
            })
        })
    };
    state = {
        uploaded: false,
        imagePost: '',
        desc: '',
    };
    handleFiles = (images) => {
        let reader = new FileReader()
        reader.readAsDataURL(images[0])
        reader.onload = () => {
            image = images[0];
            this.setState({
                imagePost: reader.result,
                uploaded: true
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    };

    render() {
        return (
            <Card className={'cardC'}>
                <CardHeader
                    avatar={
                        <img src={localStorage.getItem('profilePic')} width={60} height={60} style={{borderRadius: 30}}/>
                    }
                    className={'cardHeaderCreateP'}
                    title=<h3>Create a post</h3>
                />
                <CardContent>
                    <TextField
                        style={{width: '100%'}}
                        id="outlined-textarea"
                        placeholder="Type here..."
                        multiline
                        rowsMax={3}
                        variant="outlined"
                        required={true}
                        value={this.state.desc}
                        onChange={(e) => {
                            if(e.target.value.length<100)
                            this.setState({
                                desc: e.target.value
                            });
                        }}

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
