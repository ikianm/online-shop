import React from 'react';
import './CartProduct.css';

export default function CartProduct({ name, price, image }) {
    return (
        <div id='cart-product'>
            <img src={image} alt={name} />
            <div>
                <h5>{name}</h5>
                <span>${price}</span>
            </div>
        </div>
    )
}
