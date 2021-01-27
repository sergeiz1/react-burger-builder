import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, validationHandler } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        isSignup: true
    }

    componentDidMount = () => {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: validationHandler(event.target.value,
                    this.state.controls[controlName].validation),
                touched: true
            })
        });
        /*        const updatedControls = {
                   // won't be cloden deeply
                   ...this.state.controls,
                   // clone 1 level deeper -> email, password etc.
                   [controlName]: {
                       ...this.state.controls[controlName],
                       value: event.target.value,
                       valid: this.validationHandler(event.target.value,
                           this.state.controls[controlName].validation),
                       touched: true
                   }
               } */

        this.setState({ controls: updatedControls });
    }

    authHandler = (event) => {
        // prevent to automatically send a form request & reload the page
        event.preventDefault();
        /* const authData = {};
        // one level deep, we need value only
        for (let elementName in this.state.controls) {
            authData[elementName] = this.state.controls[elementName].value;
        } */

        //this.props.onAuth(authData.email, authData.password);
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup ? 'signUp' : 'signInWithPassword');
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(element => (
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                valueType={element.id}
                value={element.config.value}
                touched={element.config.touched}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                changed={(event) => this.inputChangedHandler(event, element.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        return (
            <div className={classes.Auth}>
                {
                    this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null
                }
                {errorMessage}
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'Sign Up' : 'Login'}</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? 'Login' : 'Sign Up'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // authReducer -> combindeReducers in index.js
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        buildingBurger: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actionCreators.auth(email, password, method)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);