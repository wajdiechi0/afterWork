import React, {Component} from 'react';
import './suggestions.css';
import IconButton from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import Firebase from './../../../services/firebase';
import {navigate} from '@reach/router';

const storageRef = Firebase.storage();
export default class SuggestionsComponent extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        defaultProfileP: ''
    };

    getImage = (image) => {
        if (!image) {
            return this.state.defaultProfileP;
        }
        console.log('0');
        return image
    };

    componentWillMount() {
        try {
            storageRef.ref('profilePic/defaultPic.png').getDownloadURL().then(url => {
                this.setState({
                    defaultProfileP: url
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'suggestionsCont'}>
                <IconButton
                    style={{marginLeft: 'auto', display: (this.props.suggestions.length === 0) ? 'none' : 'block'}}
                    onClick={() => {
                        this.props.closeSuggestions()
                    }}
                >
                    <Clear/>
                </IconButton>
                {
                    this.props.suggestions.map(item => (
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <IconButton
                                    style={{width: '100%'}}
                                    onClick={() => {
                                        navigate('/' + item.username);
                                        this.props.closeSuggestions();
                                    }}>
                                    <img src={this.getImage(item.defaultProfilePic)} height={60} width={60}
                                         style={{borderRadius: 30, marginRight: '20%'}}/>
                                    <span style={{fontWeight: 'bold'}}> {item.name}</span>
                                </IconButton>
                            </div>
                            <div style={{width: '100%', height: 1, backgroundColor: '#c4c4c4'}}/>
                        </div>
                    ))

                }
            </div>
        );
    }
}
