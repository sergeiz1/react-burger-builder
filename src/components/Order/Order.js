import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient]
            }
        );
    }

    const ingredientsFormated = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px dotted #000',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})
            </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsFormated}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
