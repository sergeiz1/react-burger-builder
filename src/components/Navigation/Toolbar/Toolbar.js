import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import MobileMenu from '../../UI/MobileMenu/MobileMenu';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MobileMenu clicked={props.toggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;
