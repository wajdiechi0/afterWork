import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDJv_39hnJ-W69BJcJRD3ee5SZICm7zxUE",
    authDomain: "wimobiafterwork.firebaseapp.com",
    databaseURL: "https://wimobiafterwork.firebaseio.com",
    projectId: "wimobiafterwork",
    messagingSenderId: "646003597684",
    appId: "1:646003597684:web:3e43129b6b36d612",
    storageBucket:"wimobiafterwork.appspot.com"
};
firebase.initializeApp(config);

export default firebase;
