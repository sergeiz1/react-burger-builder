import React from 'react';
import classes from './MobileMenu.css';

const mobileMenu = (props) => {
    return (
        <div className={classes.MobileMenu} onClick={props.clicked}>
            <div className={classes.Bar1}></div>
            <div className={classes.Bar2}></div>
            <div className={classes.Bar3}></div>
        </div>
    )
};

export default mobileMenu;