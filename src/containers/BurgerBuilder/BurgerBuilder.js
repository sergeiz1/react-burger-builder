import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/actions';


// export fot testing
export class BurgerBuilder extends Component {
    /* constructor(props) {
        super(props);
        this.state = {...}
    } */
    state = {
        orderDetails: false
    }

    componentDidMount = () => {
        this.props.onIngredientsInit(this.props.ingredients);
        /* axios.get('https://burger-builder-ffaac-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            }); */
    }

    // without redux
    /* addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    } */

    updatePurchaseState(ingredients) {
        // create an array of strings
        const sum = Object.keys(ingredients)
            .map(igKey => {
                // return values
                return ingredients[igKey];
            })
            // turn it to a single number
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // this.setState({ purchasable: sum > 0 })
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            // 'this' refers to the class
            this.setState({ orderDetails: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }

    }

    purchaseCancelHandler = () => {
        // 'this' refers to the class
        this.setState({ orderDetails: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
        // without redux
        /*  const query = [];
         for (let ingredient in this.state.ingredients) {
             query.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
         }
         // query.push('price=' + this.state.totalPrice);
         query.push('price=' + this.props.totalPrice);
         const queryString = query.join('&');
         console.log(queryString);
         this.props.history.push({
             pathname: '/checkout',
             search: queryString
         }); */
    }

    render() {
        const disabledButton = {
            //...this.state.ingredients
            ...this.props.ingredients
        };

        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded...</p> : <Spinner />;

        // if (this.state.ingredients) {
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    {/* <Burger ingredients={this.state.ingredients} /> */}
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        /* addIngredient={this.addIngredientHandler} */
                        addIngredient={this.props.onIngredientAdd}
                        /* removeIngredient={this.removeIngredientHandler} */
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disabledButton}
                        /* price={this.state.totalPrice} */
                        price={this.props.totalPrice}
                        /* purchasable={!this.state.purchasable} */
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        showOrderDetails={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary = <OrderSummary
                /* ingredients={this.state.ingredients} */
                ingredients={this.props.ingredients}
                cancelOrder={this.purchaseCancelHandler}
                checkout={this.purchaseContinueHandler}
                /* price={this.state.totalPrice} />; */
                price={this.props.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.orderDetails} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuthenticated: state.authReducer.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsInit: (ingredients) => dispatch(actionCreators.initIngredients(ingredients)),
        onIngredientAdd: (ingredient) => dispatch(
            actionCreators.addIngredient(ingredient)
            /* {
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingredient
            } */),
        onIngredientRemove: (ingredient) => dispatch(
            actionCreators.removeIngredient(ingredient)
            /* {
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingredient
            } */),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
