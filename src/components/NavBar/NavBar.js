import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";
const NavBar = ({ toggleDrawer, anchor }) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={toggleDrawer(anchor, true)} edge="start" className={classes.menuButton.concat(' mobile')} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    React Form
                </Typography>
                <span className="desktop">
                    <Button color="inherit"><NavLink className={classes.navLink} to="/dashboard">Dashboard</NavLink></Button>

                    <Button color="inherit"><NavLink className={classes.navLink} to="/form">Form</NavLink></Button>
                </span>

            </Toolbar>
        </AppBar>
    )
}

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
    navLink: {
        color: 'white',
        textDecoration: 'none'
    }
}));

export default NavBar;