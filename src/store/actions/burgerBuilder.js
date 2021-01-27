import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

// used saga instead
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_SAGA
    };
    // possible thank thunk!
    /*  return dispatch => {
         axios.get('https://burger-builder-ffaac-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
             .then(response => {
                 dispatch(setIngredients(response.data));
             })
             .catch(error => {
                 dispatch(fetchIngredientsError());
             });
     }; */
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};


export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient
    };
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient
    };
};

export const fetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR
    };
};