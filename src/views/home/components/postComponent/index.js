import React, {Component} from 'react';
import './postComponent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {TextField, Input} from '@material-ui/core/';
import Favorite from '@material-ui/icons/Favorite';
import Firebase from "../../../../services/firebase";
import BottomScrollListener from 'react-bottom-scroll-listener';
import CircularProgress from '@material-ui/core/CircularProgress';

const fireStore = Firebase.firestore();
const storage = Firebase.storage();

export default class PostComponent extends Component {
    like = (item) => {
        if (item.likes.includes(localStorage.getItem('userID'))) {
            let newLikes = [];
            item.likes.filter((value => {
                if (value !== localStorage.getItem('userID'))
                    newLikes = [...newLikes, value]
            }));
            item.likes = newLikes;
            fireStore.collection('Posts').doc(item.postID).update({
                likes: newLikes
            });
            let newPostLikes = this.state.postLikes;
            newPostLikes[item.postID]--;
            this.setState({
                postLikes: newPostLikes
            });
        } else {
            item.likes = [...item.likes, localStorage.getItem('userID')];
            fireStore.collection('Posts').doc(item.postID).update({
                likes: item.likes
            });
            let newPostLikes = this.state.postLikes;
            newPostLikes[item.postID]++;
            this.setState({
                postLikes: newPostLikes
            });
            if (localStorage.getItem('username') !== item.username)
                fireStore.collection('Notifications').doc(Date.now().toString()).set({
                    to: item.username,
                    from: localStorage.getItem('username'),
                    desc: localStorage.getItem('name') + ' liked your post',
                    date: Date(),
                    profileImg: localStorage.getItem('profilePic')
                });
        }
    };

    state = {
        posts: [],
        postLikes: {},
        loading: 'none',
        postsN: 5,
        defaultImage: ''
    };

    /*getDateTime = (date) => {
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let day = new Date(date).getDay();
        let hour = new Date(date).getHours();
        let min = new Date(date).getMinutes();

        if (min < 10) {
            return day + '/' + month + '/' + year + '  ' + hour + ':0' + min;
        }
        console.log(Date());
        return day + '/' + month + '/' + year + '  ' + hour + ':' + min;
    };*/

    load = () => {
        if (this.state.posts.length === this.state.postsN) {
            this.setState({
                loading: 'block',
                postsN: this.state.postsN + 5
            });
            fireStore.collection('Posts').get().then(data => {
                fireStore.collection('Posts').orderBy('date', 'desc').get().then(data => {
                    data.docs.forEach(value => {
                        this.state.postLikes[value.id] = value.data().likes[0] !== '' ? value.data().likes.length : 0;
                        fireStore.collection('Users').doc(value.data().user).get().then(snap => {
                            fireStore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
                                if ((currentUser.data().following.includes(value.data().user) || (value.data().user === localStorage.getItem('userID')))) {
                                    if (this.state.posts.length < this.state.postsN) {
                                        const post = {
                                            profilePic: snap.data().defaultProfilePic,
                                            name: snap.data().name,
                                            image: value.data().image,
                                            date: value.data().date,
                                            desc: value.data().desc,
                                            likes: value.data().likes,
                                            postID: value.id,
                                            username: snap.data().username
                                        };
                                        let posts = [];
                                        this.state.posts.map(val => {
                                            posts = [...posts, val.postID]
                                        });
                                        if (!posts.includes(post.postID))
                                            this.setState({
                                                posts: [...this.state.posts, post],
                                            })
                                    }
                                }
                            })
                        });
                    });
                    this.setState({
                        loading: 'none',
                    });
                })
            });

        }
    };

    render() {
        return (
            <div style={{paddingTop: 5}}>
                {
                    this.state.posts.map(item => (
                        <Card className={'card'}>
                            <CardHeader
                                avatar={
                                    <IconButton href={'/' + item.username}>
                                        <img src={item.profilePic ? item.profilePic : this.state.defaultImage}
                                             width={60} height={60} style={{borderRadius: 30}}/>
                                    </IconButton>
                                }
                                className={'cardHeaderPost'}
                                title=<h3 style={{marginRight: '70%'}}>{item.name}</h3>
                            />
                            <span className={'dateStyle'}>{item.date}</span>

                            <CardMedia
                                style={{
                                    display: item.image ? 'block' : 'none',
                                }}
                                className={'imageStyle'}
                                image={item.image ? item.image : 0}
                            />
                            <CardContent>
                                <p>{item.desc}</p>
                            </CardContent>
                            <CardActions className={'cardActionsPost'}>
                                <span>{this.state.postLikes[item.postID]}</span>
                                <IconButton
                                    onClick={() => {
                                        this.like(item)
                                    }}
                                    aria-label="post"
                                >
                                    <Favorite
                                        style={{color: item.likes.includes(localStorage.getItem('userID')) ? '#ff797b' : 'gray'}}/>
                                </IconButton>
                            </CardActions>

                        </Card>
                    ))
                }
                <BottomScrollListener onBottom={this.load}/>
                <CircularProgress style={{margin: 5, display: this.state.loading}} color="black"/>
            </div>
        )
    }

    componentDidMount() {
        try {
            storage.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
                this.setState({
                    defaultImage: url
                })
                console.log(this.state.defaultImage);
            });
        } catch (e) {
            console.log(e)
        }

        fireStore.collection('Posts').onSnapshot(data => {
            data.docs.forEach(value => {
                this.state.postLikes[value.id] = value.data().likes[0] !== '' ? value.data().likes.length : 0;
            });
            this.setState({
                postLikes: this.state.postLikes
            });
            if (this.state.posts.length < this.state.postsN) {
                this.state.postLikes = {};
                this.state.posts = [];
                fireStore.collection('Posts').orderBy('date', 'desc').get().then(data => {
                    data.docs.forEach(value => {
                        this.state.postLikes[value.id] = value.data().likes[0] !== '' ? value.data().likes.length : 0;
                        fireStore.collection('Users').doc(value.data().user).get().then(snap => {
                            fireStore.collection('Users').doc(localStorage.getItem('userID')).get().then(currentUser => {
                                console.log(currentUser.data().following.includes(value.data().user));
                                if ((currentUser.data().following.includes(value.data().user) || (value.data().user === localStorage.getItem('userID'))) && (this.state.posts.length < this.state.postsN)) {
                                    const post = {
                                        profilePic: snap.data().defaultProfilePic,
                                        name: snap.data().name,
                                        image: value.data().image,
                                        date: value.data().date,
                                        desc: value.data().desc,
                                        likes: value.data().likes,
                                        postID: value.id,
                                        username: snap.data().username
                                    };
                                    this.setState({
                                        posts: [...this.state.posts, post],
                                    })
                                }
                            });
                        })
                    })
                })
            }
        });
    }
}
