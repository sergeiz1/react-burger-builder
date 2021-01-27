import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // transform an object to array of keys - JS pure
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // Array() - JS pure -> array of igKey elements: chesse: 2 -> array(2)
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />
            });
        })
        // helps to transform an array to something else
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue);
        });
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;