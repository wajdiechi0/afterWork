import React, {Component} from 'react';
import './userProfileContent.css';
import ImagePost from './components/imagePost';
import Firebase from "../../../../services/firebase";

const fireStore = Firebase.firestore();

export default class UserProfileContent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        posts: [],
        user: ''
    };

    render() {
        return <div className="profCntnt">
            <div className={'postsContainer'}>
                {
                    this.state.posts.map((item, index) => (
                        <ImagePost user={item.user} image={item.image} desc={item.desc} key={index} likes={item.likes}
                                   comments={item.comments}/>

                    ))
                }
            </div>
        </div>
    }

    componentDidMount() {
        fireStore.collection('Users').get().then(users => {
            users.docs.forEach(user => {
                if (user.data().username === this.props.username)
                    fireStore.collection('Posts').get().then(data => {
                        data.docs.forEach(value => {
                            if (value.data().user === user.id)
                                this.setState({
                                    posts: [value.data(), ...this.state.posts]
                                });
                        })
                    })
            })
        });

    }
};
