import React, {Component} from 'react';
import './personalProfileContent.css';
import ImagePost from './components/imagePost';
import Firebase from "../../../../services/firebase";

const fireStore = Firebase.firestore();

export default class PersonalProfileContent extends Component {
    state={
        posts:[]
    };
    render() {
        return <div className="profCntnt">
            <div className={'postsContainer'}>
                {
                    this.state.posts.map((item, index) => (
                              <ImagePost image={item.image} desc={item.desc} key={index} likes={item.likes} comments={item.comments}/>

                    ))
                }
            </div>
        </div>
    }

    componentDidMount() {
        fireStore.collection('Posts').get().then(data=>{
            data.docs.forEach(value => {
                if (value.data().user === localStorage.getItem('userID'))
                this.setState({
                    posts:[value.data(),...this.state.posts]
                });
            })
        })
    }
};
