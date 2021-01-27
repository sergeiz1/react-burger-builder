import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, validationHandler } from '../../../shared/utility';

class ContactData extends Component {

    state = {
        // TODO create a function, that creates this object
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal code'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 5

                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'delivery', displayValue: 'Delivery' },
                        { value: 'self', displayValue: 'Self' }
                    ]
                },
                value: 'delivery',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        // loading: false
    }

    orderHandler = (event) => {
        // prevent to automatically send a form request & reload the page
        event.preventDefault();
        // this.setState({ loading: true });

        const formData = {};
        // one level deep, we need value only
        for (let elementId in this.state.orderForm) {
            formData[elementId] = this.state.orderForm[elementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderStart(order, this.props.token);
    }

    inputChangedHandler = (event, elementId) => {
        /* const updatedFormData = {
            // won't be cloden deeply
            ...this.state.orderForm
        } */
        // clone 1 level deeper -> name, street etc.
        /* const updatedFormElement = {
            // won't be cloden deeply, but we need value only here
            ...updatedFormData[elementId]
        } */
        const updatedFormElement = updateObject(this.state.orderForm[elementId], {
            value: event.target.value,
            valid: validationHandler(event.target.value, this.state.orderForm[elementId].validation),
            touched: true
        });
        const updatedFormData = updateObject(this.state.orderForm, {
            [elementId]: updatedFormElement
        });

        let formIsValid = true;
        for (let elementId in updatedFormData) {
            formIsValid = updatedFormData[elementId].valid && formIsValid;
        }

        this.setState({ orderForm: updatedFormData, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => {
                    return <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        valueType={element.id}
                        value={element.config.value}
                        touched={element.config.touched}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                })}
                {/* <Input inputtype="input" type="text" name="name" placeholder="Your name" /> 
                <Input inputtype="input" type="text" name="email" placeholder="Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postalcode" placeholder="Postal code" /> */}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        // if (this.state.loading) {
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
