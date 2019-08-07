import React, {Component} from 'react';
import './postComponent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {TextField, Input} from '@material-ui/core/';
import Comment from '@material-ui/icons/Comment';
import Favorite from '@material-ui/icons/Favorite';
import Avatar from './../../../../assets/wajdi.jpg'
import image1 from './../../../../assets/1.jpg';
import image5 from './../../../../assets/5.jpg';
import image6 from './../../../../assets/6.jpg';

const posts = [{desc: 'micky mouse', image: image1, date: '11/11/2018', name: 'Wajdi Echi'},
    {desc: 'paris', image: image5, date: '1/2/2019', name: 'Wajdi Echi'},
    {desc: 'Shopping', date: '5/4/2019', name: 'Wajdi Echi'},
    {desc: 'Mercedes', image: image6, date: '1/8/2019', name: 'Wajdi Echi'}]

export default class PostComponent extends Component {
    post = () => {
        console.log('sdds');
    }


    render() {
        return (
            <div style={{backgroundColor:'#e4e4e4',paddingTop:5}}>
                {
                    posts.map(item=>(
                        <Card className={'card'}>
                            <CardHeader
                                avatar={
                                    <img src={Avatar} width={60} height={60} style={{borderRadius: 30}}/>
                                }
                                className={'cardHeaderPost'}
                                title=<h3 style={{marginRight:'70%'}}>{item.name}</h3>
                            subheader={item.date}
                            />
                            <CardMedia
                                style={{
                                    display: item.image  ? 'block' : 'none',
                                }}
                                className={'imageStyle'}
                                image={ item.image  ? item.image : 0}
                            />
                            <CardContent>
                                <p>{item.desc}</p>
                            </CardContent>
                            <CardActions className={'cardActionsPost'}>
                                <IconButton aria-label="select an image">
                                        <Comment/>
                                </IconButton>

                                <IconButton
                                    onClick={this.post}
                                    aria-label="post"
                                >
                                    <Favorite/>
                                </IconButton>
                            </CardActions>

                        </Card>
                    ))
                }
            </div>
        )
    }
}


