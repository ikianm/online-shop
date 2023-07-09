import React, { useContext, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import DataContext from "./Context/dataContext";
import routes from "./Routes";

export default function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [token, setToken] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [isProductUpdated, setIsProductUpdate] = useState(false);
  const router = useRoutes(routes);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
      });
  }, [isProductUpdated])

  useEffect(() => {
    const userStoredInfo = JSON.parse(localStorage.getItem('user'));
    if (userStoredInfo) {
      setUserContext(userStoredInfo);
    }
  }, [])

  const cartProductsHandler = (productObject) => {
    setCartProducts(prevProducts => {
      return [
        ...prevProducts,
        productObject
      ]
    })
  };

  const setUserContext = (userInfo) => {
    setName(userInfo.name);
    setRole(userInfo.role);
  };

  const productsHandler = () => {
    setIsProductUpdate(prevState => {
      return !prevState;
    })
  };

  return (
    <>
      <DataContext.Provider value={{
        name,
        role,
        token,
        allProducts,
        cartProducts,
        setUserContext,
        productsHandler,
        cartProductsHandler,
      }}>
        {router}
      </DataContext.Provider>
    </>
  )
}
