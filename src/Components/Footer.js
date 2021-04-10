import { makeStyles } from '@material-ui/core'
import React from 'react';
import { useLocation } from 'react-router'
import footer from '../statics/footer.png';

const useStyles = makeStyles({
  footer: {
    height: '124px',
    width: '100%',
    position: 'relative',
    bottom: 0,
    background: `no-repeat url(${footer})`,
    backgroundSize: 'cover'
  }
})

const Footer = () => {
  const location = useLocation();
  console.log(location.pathname)

  const locationHandler = () => {
    const show = location.pathname === '/explore' ||
    location.pathname === '/admin/users' ||
    location.pathname === '/admin/places' ||
    location.pathname === '/explore/login' ||
    location.pathname === '/explore/signup' ?
    false : true;
    return show;
  }

  const classes = useStyles();
    return locationHandler() ?
      <div className={classes.footer}>
        <div className={classes.footerContent}></div>
        <div className={classes.footerImg} />
      </div>
    : <div />
}

export default Footer

