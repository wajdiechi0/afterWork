import React, {useState, useEffect} from 'react';
import {Toolbar, InputBase, IconButton, Button} from '@material-ui/core'
import './header.css';
import logo from './../../assets/coworking.png';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import {Link} from '@reach/router';
import NotificationsComponent from "./notificationsComponent";
import Firebase from './../../services/firebase';
import SuggestionsComponent from './suggestionsComponent';

const fireAuth = Firebase.auth();
const firestore = Firebase.firestore();

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        border: "gray solid .5px"
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 200,
        },
    },
}));


export default function HeaderComponent(props) {
    const classes = useStyles();
    const [openNoti, handleNoti] = useState(false);
    let headerDisplay = localStorage.getItem('headerDisplay');
    const [openMenu, handleMenu] = useState(headerDisplay);
    const [suggestions, changeSuggestions] = useState([]);
    const [showSuggestions, showSuggestionsF] = useState(false);

    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('headerDisplay', 'block');
                handleMenu(localStorage.getItem('headerDisplay'));
            } else {
                localStorage.setItem('headerDisplay', 'none');
                handleMenu(localStorage.getItem('headerDisplay'));
            }
        })
    });
    return <div>
        <Toolbar className="headerCompContainer">
            <Button href={'/'}>
                <img src={logo} height={60} width={60} alt={"logo"}/>
            </Button>
            <div>
                <div className={classes.search} style={{display: openMenu}}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                        onChange={(event) => {
                            const value = event.target.value;
                            let newSuggestions = [];
                            if (value !== '') {
                                showSuggestionsF(true);
                                firestore.collection('Users').get().then(data => {
                                    data.docs.forEach(user => {
                                        if ((user.data().name.toLowerCase().startsWith(value.toLowerCase()))&&(suggestions.length<11))
                                            newSuggestions = [...newSuggestions, user.data()]
                                    });
                                }).then(() => {
                                    changeSuggestions(newSuggestions);
                                });
                            } else {
                                showSuggestionsF(false);
                                changeSuggestions([]);
                            }

                        }}
                    >
                    </InputBase>
                </div>
                <div className={'suggestions'} style={{display: showSuggestions ? 'block' : 'none'}}>
                    <SuggestionsComponent suggestions={suggestions} closeSuggestions={() => {
                        showSuggestionsF(false)
                    }}/>
                </div>
            </div>
            <div className={'nav'} style={{display: openMenu}}>
                <Link to={''}>
                    <IconButton onClick={() => {
                        handleNoti(true)
                    }}>
                        <NotificationsActive/>
                    </IconButton>
                </Link>
                <Link to={'/profile'}>
                    <IconButton>
                        <Person/>
                    </IconButton>
                </Link>
            </div>
        </Toolbar>
        <NotificationsComponent open={openNoti} close={() => handleNoti(false)}/>
    </div>
};
