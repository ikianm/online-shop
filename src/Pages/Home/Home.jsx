import React, { useState, useContext } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import Product from '../../Components/Product/Product';
import Footer from '../../Components/Footer/Footer';
import DataContext from '../../Context/dataContext';
import './Home.css';

export default function Home() {
    const dataContext = useContext(DataContext);

    return (
        <div id='home'>
            <Topbar />
            <div id='home-product-section'>
                {
                    dataContext.allProducts.map(product => ( //render products to /Home
                        <Product {...product} key={product._id} />
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}
