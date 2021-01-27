import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 1,
    building: false,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.3,
    bacon: 1.1
}

let updatedIngredient = null;
let updatedIngredients = null;
let updatedState = null;

const changeIngredients = (state, action, option) => {
    updatedIngredient = {
        [action.ingredientName]: option === 'add' ?
            state.ingredients[action.ingredientName] + 1 :
            state.ingredients[action.ingredientName] - 1
    };
    updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    updatedState = {
        ingredients: updatedIngredients,
        totalPrice: option === 'add' ?
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName] :
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 1,
                building: false,
                error: false
            });
        /* return {
            ...state,
            ingredients: action.ingredients,
            totalPrice: 1,
            error: false
        } */
        case actionTypes.ADD_INGREDIENT:
            return changeIngredients(state, action, 'add');
        /* return {
            // high-level cloning
            ...state,
            // deep cloning
            ingredients: {
                ...state.ingredients,
                // an ingredient recieve a new value
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        } */
        case actionTypes.REMOVE_INGREDIENT:
            return changeIngredients(state, action, 'remove');
        /* return {
            // high-level cloning
            ...state,
            // deep cloning
            ingredients: {
                ...state.ingredients,
                // an ingredient recieve a new value
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        } */
        case actionTypes.FETCH_INGREDIENTS_ERROR:
            return updateObject(state, { error: true });
        /* return {
            ...state,
            error: true
        } */
        default:
            return state;
    }

};

export default reducer;