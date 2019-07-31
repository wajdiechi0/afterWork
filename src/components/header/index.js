import React from 'react';
import {Toolbar, InputBase, IconButton} from '@material-ui/core'
import './header.css';
import logo from './../../assets/coworking.png';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import People from '@material-ui/icons/People';
import NotificationsActive from '@material-ui/icons/NotificationsActive';

import {Link} from '@reach/router';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));


export default function HeaderComponent() {

    const classes = useStyles();

    return <div>
        <Toolbar className="headerCompContainer">
            <img src={logo} height={60} width={60} alt={"logo"}/>
            <div className={classes.search}>
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
                />
            </div>
            <div className={'nav'}>
                <Link to={''}>
                    <IconButton>
                        <NotificationsActive/>
                    </IconButton>
                </Link>
                <Link to={'/discover'}>
                    <IconButton>
                        <People/>
                    </IconButton>
                </Link>
                <Link to={'/profile'}>
                    <IconButton>
                        <Person/>
                    </IconButton>
                </Link>
            </div>
        </Toolbar>
    </div>
};
