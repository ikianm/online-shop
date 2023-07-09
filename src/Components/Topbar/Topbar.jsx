import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DataContext from '../../Context/dataContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CartProduct from '../CartProduct/CartProduct';
import './Topbar.css';


export default function Topbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const dataContext = useContext(DataContext);
    const navigate = useNavigate();

    const toggleHandler = () => {
        isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
    };

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < dataContext.cartProducts.length; i++) {
            let price = parseFloat(dataContext.cartProducts[i].price);
            total += price;
            setTotalPrice(total);
        }
    }, [dataContext.cartProducts]);

    return (
        <div id='topbar'>
            <div id='topbar-right'>
                <h2 id='topbar-logo'>فروشگاه کیان</h2>
                <Badge
                    id='top-right-button'
                    badgeContent={dataContext.cartProducts.length}
                    color='primary'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    showZero
                    className={isMenuOpen ? 'show' : ''}
                >
                    <Button
                        variant={isMenuOpen ? 'contained' : 'outlined'}
                        color='primary'
                        size='large'
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >سبد خرید</Button>
                </Badge>
            </div>
            <div id='topbar-left'>
                <Button
                    id='topbar-left-button'
                    variant={isMenuOpen ? 'contained' : 'outlined'}
                    color='primary'
                    size='large'
                    startIcon={!dataContext.name ? <LoginIcon /> : ''}
                    className={isMenuOpen ? 'show' : ''}
                    onClick={() => navigate('/login')}
                >{dataContext.name ? dataContext.name : 'ورود / ثبت نام'}</Button>

                {
                    dataContext.role === 'admin' ? (<Button
                        id='topbar-left-button'
                        variant={isMenuOpen ? 'contained' : 'outlined'}
                        color='primary'
                        size='large'
                        startIcon={<AdminPanelSettingsIcon />}
                        className={isMenuOpen ? 'show' : ''}
                        onClick={() => navigate('/dashboard')}
                    >داشبورد
                    </Button>) : null
                }


                <Badge //toggle menu button
                    id='toggle-menu'
                    badgeContent={dataContext.cartProducts.length}
                    color='primary'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    showZero
                >
                    <button onClick={toggleHandler}>
                        <MenuIcon />
                    </button>
                </Badge>
            </div>

            {
                isCartOpen ? (
                    <div id="cart-products">
                        {
                            dataContext.cartProducts.map(product => (
                                <CartProduct name={product.name} image={product.image} price={product.price} key={product._id} />
                            ))
                        }
                        <div id='total-price'>کل مبلغ سبد خرید: {totalPrice}</div>
                        <Button variant='outlined' id='purchase-button'>پرداخت و ادامه</Button>
                    </div>
                ) : null
            }

        </div>
    )
}
