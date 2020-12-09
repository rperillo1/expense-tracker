import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { IsLoggedInContext } from '../contexts/IsLoggedInContext';
import Login from './Login';
import Logout from './Logout';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function Navbar({ authenticateUser }) {
    const { isLoggedIn, toggleIsLoggedIn } = useContext(IsLoggedInContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Expense Tracker
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                    {isLoggedIn ?
                        <Button><Logout toggleIsLoggedIn={toggleIsLoggedIn} /></Button>
                        :
                        <Button><Login authenticateUser={authenticateUser} /></Button>
                    }
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default Navbar;