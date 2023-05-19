import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'; // Import the logo
import './NavBar.css'; // Import the styles

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['background-color', 'box-shadow']),
  },
  appBarScrolled: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScroll = window.scrollY > 0;
      if (isScroll !== isScrolling) {
        setIsScrolling(!isScrolling);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // cleanup the event listener
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  return (
    <div className="nav-root">
      <AppBar
        position="sticky"
        className={isScrolling ? classes.appBarScrolled : classes.appBar}
      >
        <Toolbar className="nav-toolbar">
          <Typography variant="h6" className="nav-title">
            <img src={logo} alt="Logo" className="nav-logo" />
            South Side Bookkeepers
          </Typography>
          <div className="nav-links">
            <Button color="primary" component={Link} to="/">Home</Button>
            <Button color="primary" component={Link} to="/services">Services</Button>
            <Button color="primary" component={Link} to="/team">Team</Button>
            <Button color="primary" component={Link} to="/about">About</Button>
            <Button color="primary" component={Link} to="/contact">Contact Us</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
