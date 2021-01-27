import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={classes.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>
    </Aux>
);

const areEqual = (prevState, nextState) => {
    return prevState.show === nextState.show && nextState.children === prevState.children;
}

/*
    alternative to shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || 
                nextProps.children !== this.props.children;
    }
*/
// prevent shouldComponentUpdate() all the time, update only if show changed 
export default React.memo(modal, areEqual);
/* (prevState, nextState) => (prevState.show === nextState.show && nextState.children === prevState.children) */
