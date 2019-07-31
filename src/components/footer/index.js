import React from 'react';
import './footer.css';
import {Button} from '@material-ui/core';
const footerButtons = ['about us', 'support', 'press', 'api', 'jobs', 'privacy', 'terms', 'directory', 'profiles', 'hashtags', 'language']

export default function HeaderComponent() {


// buttons to be òodified to be looped on footerbuttons, content will be link > textbutton
    return (<div className="footerCompContainer">
        <div>
            {
                footerButtons.map((item, idx) => (
                    <Button style={{fontWeight:'bold'}} key={idx} >{item}</Button>
                ))
            }
        </div>
        <p style={{fontWeight: 'bold', color: '#979797'}}>© 2019 AfterWork</p>
    </div>)
};

