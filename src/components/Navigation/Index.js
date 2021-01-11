import React from 'react';
import firebase from 'firebase'
import 'firebase/auth'
import clsx from 'clsx';
import {useUser} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import {ROUTE_CONSTANTS} from '../../routeConstants';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },  
});

export default function Navigation(props) {

  const isBookPage = useLocation().pathname.includes("/book/");

  const classes = useStyles();
  const [drawerStatus, setDrawerStatus] = React.useState({left: false});
  const eyeImgLink = props.commentVisibility ? '/invisible.svg' : '/view.svg'
  
  const user = useUser();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerStatus({ ...drawerStatus, [anchor]: open });
  };

  const logout = () => {
    firebase.auth().signOut()
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
            <ListItemText primary={user.data && user.data.displayName || 'User'} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={user.data && user.data.email} />
        </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button>
            <Link to={ROUTE_CONSTANTS.LIBRARY_PAGE}>Library</Link>
          </ListItem>
      </List>
      <List>
          <ListItem button>
            <Link to={ROUTE_CONSTANTS.CONTACT_PAGE}>Contact US </Link>
          </ListItem>
      </List>
      <List>
          <ListItem button>
            <Link to='#' onClick={logout}>Logout</Link>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <div className ="nav-holder">
            <img className="burger-holder" src='/burger.svg' onClick={toggleDrawer(anchor, true)} />

           {/** Block for comment vissibility */}
           {
            isBookPage && 
              <img className="eye-holder"
                src={eyeImgLink}
                onClick = {props.handleClick}
              />
            }   
            </div>
          <Drawer anchor={anchor} open={drawerStatus[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}