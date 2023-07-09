import { createContext } from 'react';

const DataContext = createContext({
    token: null,
    name: null,
    role: null,
    allProducts: [],
    cartProducts: [],
    setUserContext: () => { },
    productsHandler: () => { },
    cartProductsHandler: () => { }
});


export default DataContext;