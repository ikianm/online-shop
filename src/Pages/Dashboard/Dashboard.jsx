import React, { useReducer, useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../Context/dataContext';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';

const actionList = {
    SET_NAME: 'SET_NAME',
    SET_PRICE: 'SET_PRICE',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_COUNT: 'SET_COUNT',
    SET_IMAGEURL: 'SET_IMAGEURL',
    SET_DESC: 'SET_DESC',
    SHOW_ALERT_SUCCESS: 'SHOW_ALERT_SUCCESS',
    SHOW_ALERT_ERROR: 'SHOW_ALERT_ERROR',
    CLOSE_ALERT: 'CLOSE_ALERT',
    CLEAR_INPUTS: 'CLEAR_INPUTS'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionList.SET_NAME:
            return {
                ...state,
                name: action.payload
            }

        case actionList.SET_PRICE:
            return {
                ...state,
                price: action.payload
            }

        case actionList.SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        case actionList.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }

        case actionList.SET_IMAGEURL:
            return {
                ...state,
                imageUrl: action.payload
            }

        case actionList.SET_DESC:
            return {
                ...state,
                desc: action.payload
            }

        case actionList.SHOW_ALERT_SUCCESS:
            return {
                ...state,
                isShowAlert: true,
                isFormValid: true,
            }

        case actionList.SHOW_ALERT_ERROR:
            return {
                ...state,
                isShowAlert: true,
                isFormValid: false,
            }

        case actionList.CLOSE_ALERT:
            return {
                ...state,
                isShowAlert: false,
                isFormValid: false
            }

        case actionList.CLEAR_INPUTS:
            return {
                ...state,
                name: '',
                price: 0,
                category: 'mobile',
                count: 0,
                imageUrl: '',
                desc: '',
            }

        default:
            return {
                ...state
            }
    }
};

export default function Dashboard() {
    const navigate = useNavigate();
    const dataContext = useContext(DataContext);
    const [allUsers, setAllUsers] = useState([]);
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        price: 0,
        category: 'mobile',
        count: 0,
        imageUrl: '',
        desc: '',
        isShowAlert: false,
        isFormValid: false,
    });

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(res => res.json())
            .then(data => {
                setAllUsers(data);
                console.log(data);
            })
    }, []);

    const addProductHandler = () => {
        if (state.name != '' && state.imageUrl != '' && state.desc != '') {
            dispatch({ type: actionList.SHOW_ALERT_SUCCESS });
            fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: state.name,
                    price: state.price,
                    category: state.category,
                    count: state.count,
                    image: state.imageUrl,
                    description: state.desc,
                })
            }).then(() => dataContext.productsHandler());
        } else {
            dispatch({ type: actionList.SHOW_ALERT_ERROR })
        }
        dispatch({ type: actionList.CLEAR_INPUTS });
        setTimeout(() => {
            dispatch({ type: actionList.CLOSE_ALERT });
        }, 2000);
    };

    const deleteProductHandler = (id) => {
        fetch(`http://localhost:8080/products/${id}`, { method: 'DELETE' }).then(() => dataContext.productsHandler());
    };

    const deleteUserHandler = (id) => {
        fetch(`http://localhost:8080/users/${id}`, { method: 'DELETE' })
            .then(() => {
                setAllUsers(prevUsers => {
                    return prevUsers.filter(user => {
                        return user._id !== id;
                    })
                })

            });
    };


    return (
        <>
            {
                dataContext.role ? (<div id="dashboard-template">
                    {
                        state.isShowAlert && state.isFormValid ? (<Alert severity="success" >
                            <AlertTitle>عملیات انجام شد</AlertTitle>
                            محصول با موفقیت اضافه شد
                        </Alert>) : state.isShowAlert && !state.isFormValid ? (
                            <Alert severity="error" >
                                <AlertTitle>عملیات انجام نشد</AlertTitle>
                                مقادیر ورودی نامعتبر است
                            </Alert>
                        ) : ''

                    }

                    <div id='add-product'>
                        <h3>افزودن محصول</h3>
                        <div id='add-product-form'>
                            <TextField
                                id="outlined-basic"
                                label="نام"
                                color='primary'
                                variant='outlined'
                                value={state.name}
                                onChange={(e) => dispatch({ type: actionList.SET_NAME, payload: e.target.value })}
                            />
                            <TextField
                                id="outlined-basic"
                                label="قیمت"
                                color='primary'
                                variant='outlined'
                                value={state.price}
                                onChange={(e) => dispatch({ type: actionList.SET_PRICE, payload: e.target.value })}
                            />
                            <FormControl style={{ width: '100px' }}>
                                <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.category}
                                    label="Age"
                                    onChange={(e) => dispatch({ type: actionList.SET_CATEGORY, payload: e.target.value })}>
                                    <MenuItem value='mobile'>موبایل</MenuItem>
                                    <MenuItem value='laptop'>لپتاپ</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-basic"
                                label="موجودی"
                                color='primary'
                                variant='outlined'
                                value={state.count}
                                onChange={(e) => dispatch({ type: actionList.SET_COUNT, payload: e.target.value })}
                            />
                            <TextField
                                id="outlined-basic"
                                label="تصویر"
                                color='primary'
                                variant='outlined'
                                value={state.imageUrl}
                                onChange={(e) => dispatch({ type: actionList.SET_IMAGEURL, payload: e.target.value })}
                            />
                            <TextField
                                id="outlined-basic"
                                label="توضیحات"
                                color='primary'
                                variant='outlined'
                                fullWidth
                                value={state.desc}
                                style={{ gridColumnStart: '1', gridColumnEnd: '4' }}
                                onChange={(e) => dispatch({ type: actionList.SET_DESC, payload: e.target.value })}
                            />
                        </div>
                        <Button
                            variant='outlined'
                            onClick={addProductHandler}
                        >افزودن</Button>
                        <Button
                            variant='outlined'
                            style={{ marginTop: '5px' }}
                            onClick={() => navigate('/home')}
                        >صفحه اصلی</Button>
                    </div>

                    <div id='product-list'>
                        <Table striped bordered size='lg' responsive className='tables'>
                            <thead>
                                <tr>
                                    <th>آیدی</th>
                                    <th>نام</th>
                                    <th>قیمت</th>
                                    <th>دسته بندی</th>
                                    <th>موجودی</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataContext.allProducts.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.count}</td>
                                            <td>
                                                <button
                                                    onClick={() => deleteProductHandler(product._id)} className='delete-button'>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                    <div id='users-list'>
                        <Table striped bordered size='lg' responsive className='tables'>
                            <thead>
                                <tr>
                                    <th>آیدی</th>
                                    <th>نام</th>
                                    <th>ایمیل</th>
                                    <th>نقش</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUsers ? allUsers.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button
                                                    onClick={() => deleteUserHandler(user._id)} className='delete-button'>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>) : (<Alert variant="filled" severity="error">
                    ورود نامعتبر! شما ادمین نیستید
                </Alert>)
            }

        </>
    )
}
