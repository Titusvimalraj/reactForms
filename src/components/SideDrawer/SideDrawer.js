import React from 'react';
import clsx from 'clsx';
import { List, SwipeableDrawer, makeStyles, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard as DashboardIcon, ListAlt } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
const SideDrawer = ({ anchor, toggleDrawer, showSideMenu }) => {
    const styles = useStyles();

    const list = (anchor) => (
        <div
            className={clsx(styles.list, {
                [styles.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* {['Dashboard', 'Form'].map(text => (<ListItem key={text} button>
                    <ListItemIcon>{text == 'Dashboard' ? DashboardIcon : ListAlt}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>))
                } */}
                <NavLink className={styles.onlyText} to="/dashboard">
                    <ListItem button>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <Divider />
                <NavLink className={styles.onlyText} to="/form">
                    <ListItem button>
                        <ListItemIcon><ListAlt /></ListItemIcon>
                        <ListItemText primary="Form" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
    return (
        <>
            <SwipeableDrawer className="mobile"
                anchor={anchor}
                open={showSideMenu[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                {list(anchor)}
            </SwipeableDrawer>
        </>
    )
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    onlyText: {
        textDecoration: 'none'
    }
});


export default SideDrawer;