import React from 'react';
import CheckoutSummary from '../Order/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    const purchased = props.purchased ? <Redirect to="/" /> : null;
    const summary = props.ingredients ?
        <div>
            {purchased}
            <CheckoutSummary ingredients={props.ingredients}
                onCancel={checkoutCancelHandler}
                onContinue={checkoutContinueHandler} />
            <Route path={props.match.path + '/contact-data'}
                /* with redux */
                component={ContactData} />
        </div> :
        <Redirect to="/" />
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    };
}

export default connect(mapStateToProps)(checkout);