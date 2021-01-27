import React from 'react';
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';

const navItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink to={props.link}
            activeClassName={classes.active}
            exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;