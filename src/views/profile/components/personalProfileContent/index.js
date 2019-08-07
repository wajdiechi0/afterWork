import React, {Component} from 'react';
import './personalProfileContent.css';
import ImagePost from './components/imagePost';
import image1 from './../../../../assets/1.jpg';
import image2 from './../../../../assets/2.jpg';
import image3 from './../../../../assets/3.jpg';
import image4 from './../../../../assets/4.jpg';
import image5 from './../../../../assets/5.jpg';
import image6 from './../../../../assets/6.jpg';

const imagesArray = [image1, image2, image3, image4, image5, image6, image1];
export default class PersonalProfileContent extends Component {
    render() {
        return <div className="profCntnt">
            <div className={'postsContainer'}>
                {
                    imagesArray.map((item, index) => (
                              <ImagePost image={item} key={index}/>

                    ))
                }
            </div>
        </div>
    }
};
