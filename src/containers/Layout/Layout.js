import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    // useStae: import from 'react'
    // const [showSideDrawer, setShowSideDrawer] => useStae(false);
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        // setShowSideDrawer(false);
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        // setShowSideDrawer(!showSideDrawer);
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    toggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} close={this.sideDrawerCloseHandler} />
                <div>Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);